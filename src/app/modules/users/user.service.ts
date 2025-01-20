
import { User } from './user.model'
import { IUser } from './user.interface'
import config from '../../../config'

import ApiError from '../../../errors/ApiErrors'
import { generateStudentId } from './user.utils'
import { IAcademicSemester } from '../academicsemister/academicsemister.interface'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto inclement the id and default password
const acadimaicsimister = {
  year: '2024',
  code: '10',
}
  const id = await generateStudentId(acadimaicsimister as IAcademicSemester)

  user.id = id

  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user')
  }
  return createdUser
}

const getUsers = async (): Promise<IUser[]> => {
  const users = await User.find()
  return users
}

export const usersService = {
  createUser,getUsers
}


