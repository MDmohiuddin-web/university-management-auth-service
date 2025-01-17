
import { User } from './user.model'
import { IUser } from './user.interface'
import config from '../../../config'
import { generateUserId } from './user.utils'
import ApiError from '../../../errors/ApiErrors'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto inclement the id and default password

  const id = await generateUserId()

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

export const usersService = {
  createUser,
}

