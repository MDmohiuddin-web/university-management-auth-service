import { NextFunction, Request, RequestHandler, Response } from 'express'
import { academicSemesterService } from './academicsemister.service'
import catchAsync from '../../../shared/catchAsync'

const createSemester = catchAsync(async (req: Request, res:Response, next:NextFunction) => {
  const { ...academicSemesterData } = req.body
  const result =
    await academicSemesterService.createSemester(academicSemesterData)
    next()
  res.status(201).json({
    data: result,
    message: 'Semester created successfully',
    status: true,
  })
})

export const AcademicSemesterController = {
  createSemester,
}
