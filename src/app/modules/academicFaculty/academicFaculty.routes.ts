import express from 'express'
import ValidationRequest from '../../middlewares/ValidationRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
import { academicFacultyController } from './academicFaculty.controller'

const router = express.Router()

router.post(
  '/',
  ValidationRequest(academicFacultyValidation.createAcademicFacultyZodSchema),
)

router.patch(
  '/:id',
  ValidationRequest(academicFacultyValidation.updateAcademicFacultyZodSchema),
  academicFacultyController.updateAcademicFaculty,
)
router.get('/:id', academicFacultyController.getSingleAcademicFaculty)
router.delete('/:id', academicFacultyController.deleteAcademicFaculty)
