import express from 'express'
import ValidationRequest from '../../middlewares/ValidationRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
import { academicFacultyController } from './academicFaculty.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.post(
  '/create-faculty',
  ValidationRequest(academicFacultyValidation.createAcademicFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicFacultyController.createAcademicFaculty,
)
router.get('/', academicFacultyController.getAllAcademicFaculty)

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
  ),
  academicFacultyController.getSingleAcademicFaculty,
)

router.patch(
  '/:id',
  ValidationRequest(academicFacultyValidation.updateAcademicFacultyZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
  ),
  academicFacultyController.updateAcademicFaculty,
)

router.delete('/:id', academicFacultyController.deleteAcademicFaculty)

export const academicDepartmentFacultyRoutes = router
