import express from 'express'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'
import ValidationRequest from '../../middlewares/ValidationRequest'

const router = express.Router()
// router.post(
//   '/create-user',
//   ValidationRequest(UserValidation.createUserZodSchema),
//   UserController.createUser,


// )
router.post(
  '/create-student',
  ValidationRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
 
);

router.post(
  '/create-faculty',
  ValidationRequest(UserValidation.createFacultyZodSchema),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createFaculy
);

// router.post(
//   '/create-admin',
//   ValidationRequest(UserValidation.createAdminZodSchema),
//   // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   UserController.createAdmin
// );


export const userRoutes = router

