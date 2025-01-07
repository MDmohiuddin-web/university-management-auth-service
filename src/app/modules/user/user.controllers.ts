import { RequestHandler } from 'express'
import { usersService } from './user.service'


const createUser: RequestHandler = async (req, res, next) => {
  try {
    
    
    const { user } = req.body
    const result = await usersService.createUser(user)
    res.status(200).json({
      data: result,
      message: 'user created successfully',
      status: true,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUser,
}

