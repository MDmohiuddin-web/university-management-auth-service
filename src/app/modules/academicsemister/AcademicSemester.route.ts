import express from 'express'
import ValidationRequest from '../../middlewares/ValidationRequest'

import { AcademicSemesterController } from './academicSemester.controller'
import { AcademicSemesterValidation } from './academicSemester.validation'
import convertYearToNumber from './academicSemester.utils'

const router = express.Router()

router.post(
  '/create-semester',
  convertYearToNumber,
  ValidationRequest(AcademicSemesterValidation.AcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
)

router.get('/', AcademicSemesterController.getAllSemesters)

export const AcademicSemesterRoutes = router
