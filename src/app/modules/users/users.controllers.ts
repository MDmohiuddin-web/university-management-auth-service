import { Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    res
      .status(200)
      .json({ data: result, message: 'user created successfully', status: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'failed to create user' })
  }
}

export default {
  createUser,
}
