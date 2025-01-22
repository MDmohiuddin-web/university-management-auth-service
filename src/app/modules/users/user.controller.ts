import { NextFunction, Request, RequestHandler, Response } from 'express'

import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IUser } from './user.interface'
import { UserService } from './user.service'

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student,...userData } = req.body
    const result = await UserService.createStudent(student,userData)
    sendResponse<IUser>(res, {
      data: result,
      message: 'User created successfully',
      success: true,
      statusCode: httpStatus.OK,
    })
  },
)




export const UserController = {
  createStudent
}
