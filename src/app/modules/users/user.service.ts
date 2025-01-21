import httpStatus from 'http-status'

import { User } from './user.model'
import { IUser } from './user.interface'
import config from '../../../config'
import ApiError from '../../../errors/ApiErrors'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academicsemister/academicsemister.model'
import { generateStudentId } from './user.utils'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'

const createStudent = async (
  student: IStudent,
  user: IUser,
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_pass as string
  }
  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  )

  if (!academicSemester) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Academic semester not found')
  }
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const id = await generateStudentId(academicSemester)
    user.id = id
    student.id = id

    const createdStudent = await Student.create([student], { session })
    if (!createdStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    user.student = createdStudent[0]._id
    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    session.endSession()
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
  // user => user.student => student=> academicSemester,academic faculty,academicDepartment
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData._id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    })
  }
  return newUserAllData
}

const getUsers = async (): Promise<IUser[]> => {
  const users = await User.find()
  return users
}

export const usersService = {
  createStudent,
  getUsers,
}
