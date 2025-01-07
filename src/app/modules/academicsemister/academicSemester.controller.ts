import { RequestHandler } from 'express'
import { academicSemesterService } from './academicsemister.service'

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body
    const result =
      await academicSemesterService.createSemester(academicSemesterData)
    res.status(201).json({
      data: result,
      message: 'Semester created successfully',
      status: true,
    })
  } catch (error) {
    next(error)
  }
}

export const AcademicSemesterController = {
  createSemester,
}
