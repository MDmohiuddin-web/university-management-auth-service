import { IAcademicSemester } from '../academicsemister/academicsemister.interface'

import { User } from './user.model'

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined
}

export const generateStudentId = async (
  academicSemester: IAcademicSemester,
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0')

  // increment by 1
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementId = `${academicSemester?.year.substring(2, 4)}${academicSemester?.code}${incrementId}`
  // console.log('incrementId', incrementId) //test console
  return incrementId
}

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}
export const GenerateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0')
  // increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  incrementedId = `F-${incrementedId}`
  return incrementedId
}
