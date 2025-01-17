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

router.patch('/:id', AcademicSemesterController.updateSemester)
// ensure 1: route level :update--=>give me title nnd code,neither
// ensure 2: route level :update--=>Mapping title :code
router.get('/:id', AcademicSemesterController.getSingleSemesterById)
router.get('/', AcademicSemesterController.getAllSemesters)

export const AcademicSemesterRoutes = router
