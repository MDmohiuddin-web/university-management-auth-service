import express from 'express'
import ValidationRequest from '../../middlewares/ValidationRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
import { academicFacultyController } from './academicFaculty.controller'

const router = express.Router()

router.post(
  '/create-faculty',
  ValidationRequest(academicFacultyValidation.createAcademicFacultyZodSchema),
  academicFacultyController.createAcademicFaculty,

)
router.get('/', academicFacultyController.getAllAcademicFaculty)
router.get('/:id', academicFacultyController.getSingleAcademicFaculty)

router.patch(
  '/:id',
  ValidationRequest(academicFacultyValidation.updateAcademicFacultyZodSchema),
  academicFacultyController.updateAcademicFaculty,
)

router.delete('/:id', academicFacultyController.deleteAcademicFaculty)

export const academicDepartmentFacultyRoutes = router
