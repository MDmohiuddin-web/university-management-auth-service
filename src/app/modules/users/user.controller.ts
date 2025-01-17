import { NextFunction, Request, RequestHandler, Response } from 'express'
import { usersService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { user } = req.body
    const result = await usersService.createUser(user)
   
    // res.status(201).json({
    //   data: result,
    //   message: 'User created successfully',
    //   status: true,
    // })
    sendResponse(res, {
      data: result,
      message: 'User created successfully',
      success: true,
      statusCode: httpStatus.OK,
    })
  },
)

export const UserController = {
  createUser,
}
