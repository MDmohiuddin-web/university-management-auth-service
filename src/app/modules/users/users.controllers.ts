import { NextFunction } from 'express';
import { Request, Response } from 'express'
import usersService from './users.service'

const createUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    res
      .status(200)
      .json({ data: result, message: 'user created successfully', status: true })
  } catch (error) {
    next(error)
  }
}    

export default {
  createUser,
}
  