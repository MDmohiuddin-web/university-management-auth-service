import { NextFunction, Request, RequestHandler, Response } from 'express'
import { usersService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IUser } from './user.interface'

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body
    const result = await usersService.createUser(user)
   
    // res.status(201).json({
    //   data: result,
    //   message: 'User created successfully',
    //   status: true,
    // })
    sendResponse<IUser>(res, {
      data: result,
      message: 'User created successfully',
      success: true,
      statusCode: httpStatus.OK,
    })
  },
)
const getUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await usersService.getUsers()
    res.status(200).json({
      data: users,
      message: 'Users fetched successfully',
      status: true,
    })
  },
)



export const UserController = {
  createUser,getUsers
}
