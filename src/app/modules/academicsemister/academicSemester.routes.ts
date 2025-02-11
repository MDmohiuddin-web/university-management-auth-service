import express from 'express'
import ValidationRequest from '../../middlewares/ValidationRequest'

import { AcademicSemesterController } from './academicSemester.controller'
import { AcademicSemesterValidation } from './academicSemester.validation'


const router = express.Router()

router.post(
  '/create-semester',

  ValidationRequest(AcademicSemesterValidation.AcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
)

router.patch(
  '/:id',
  ValidationRequest(AcademicSemesterValidation.UpdateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester,
)
// ensure 1: route level :update--=>give me title nnd code,neither
// ensure 2: route level :update--=>Mapping title :code
router.get('/:id', AcademicSemesterController.getSingleSemesterById)
router.delete('/:id', AcademicSemesterController.deleteSemester)
router.get('/', AcademicSemesterController.getAllSemesters)

export const AcademicSemesterRoutes = router
