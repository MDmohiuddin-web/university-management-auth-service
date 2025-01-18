import express from 'express'

import { AcademicDepartmentValidation } from './academicDepartment.validations'
import { AcademicDepartmentController } from './academicDepartment.controller'
import ValidationRequest from '../../middlewares/ValidationRequest'
// import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.post(
  '/create-department',
  ValidationRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.createDepartment,
)

router.get('/:id', AcademicDepartmentController.getSingleDepartment)

router.get('/', AcademicDepartmentController.getAllDepartments)

router.patch(
  '/:id',
  ValidationRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.updateDepartment,
)

router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicDepartmentController.deleteDepartment,
)

export const AcademicDepartmentRoutes = router
