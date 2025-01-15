import { NextFunction, Request, Response } from 'express'
import { academicSemesterService } from './academicsemister.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../conostants/pagenation'
import { IAcademicSemester } from './academicsemister.interface'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const result =
      await academicSemesterService.createSemester(academicSemesterData)
    sendResponse(res, {
      message: 'semester created successfully',
      success: true,
      statusCode: httpStatus.OK,
      data: result,
    })
    next()
  },
)

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, ['searchTerm'])
    const paginationOptions = pick(req.query, paginationFields)
    // console.log(paginationOptions)
    const result =
      await academicSemesterService.getallSemesters(filters, paginationOptions)
    sendResponse<IAcademicSemester[]>(res, {
      meta: result.meta,
      message: 'semester retrieved successfully',
      success: true,
      statusCode: httpStatus.OK,
      data: result.data,
    })
    // next()
  },
)

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
}
