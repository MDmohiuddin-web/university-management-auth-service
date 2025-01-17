import { NextFunction, Request, Response } from 'express'
import { academicSemesterService } from './academicsemister.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../conostants/pagenation'
import { IAcademicSemester } from './academicsemister.interface'
import { academicSemesterFilterableFinds } from './academicSemester.constant'

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

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    searchTerm: '', // Provide a default value for searchTerm
    ...pick(req.query, academicSemesterFilterableFinds),
  }
  const paginationOptions = pick(req.query, paginationFields)
  const result = await academicSemesterService.getallSemesters(
    filters,
    paginationOptions,
  )
  sendResponse<IAcademicSemester[]>(res, {
    meta: result.meta,
    message: 'Semester retrieved successfully',
    success: true,
    statusCode: httpStatus.OK,
    data: result.data,
  })
})

const getSingleSemesterById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await academicSemesterService.getSingleSemester(id)
    sendResponse<IAcademicSemester>(res, {
      message: 'Semester retrieved successfully',
      success: true,
      statusCode: httpStatus.OK,
      data: result,
    })
  },
)

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await academicSemesterService.updateSemester(id, updatedData)
  sendResponse<IAcademicSemester>(res, {
    message: 'Semester updated successfully',
    success: true,
    statusCode: httpStatus.OK,
    data: result,
  })
})
const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await academicSemesterService.deleteSemester(id)
  sendResponse<IAcademicSemester>(res, {
    message: 'Semester deleted successfully',
    success: true,
    statusCode: httpStatus.OK,
    data: result,
  })
})

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemesterById,
  updateSemester,
  deleteSemester,
}
