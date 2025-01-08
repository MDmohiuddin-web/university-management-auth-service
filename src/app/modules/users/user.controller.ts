import { NextFunction, Request, RequestHandler, Response } from 'express'
import { usersService } from './user.service'
import catchAsync from '../../../shared/catchAsync'

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body
    const result = await usersService.createUser(user)
    next()
    res.status(201).json({
      data: result,
      message: 'User created successfully',
      status: true,
    })
  },
)

export const UserController = {
  createUser,
}
