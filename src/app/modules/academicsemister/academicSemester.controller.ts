import { NextFunction, Request, Response } from 'express'
import { academicSemesterService } from './academicsemister.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../conostants/pagenation'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result =
      await academicSemesterService.createSemester(academicSemesterData)

    // res.status(201).json({
    //   data: result,
    //   message: 'Semester created successfully',
    //   status: true,
    // })
    sendResponse(res, {
      data: result,
      message: 'semester created successfully',
      success: true,
      statusCode: httpStatus.OK,
    })
    next()
  },
)

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // }

    // or

    const paginationOptions = pick(req.query, paginationFields)

    // console.log(paginationOptions)

    const result =
      await academicSemesterService.getallSemester(paginationOptions)
    sendResponse(res, {
      data: result,
      message: 'semester retrieved successfully',
      success: true,
      statusCode: httpStatus.OK,
    })
    // next()
  },
)

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
}
