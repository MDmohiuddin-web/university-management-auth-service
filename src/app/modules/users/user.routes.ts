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
  ValidationRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
 
);
// optional
router.get('/get-users', UserController.getUsers)

export const userRoutes = router

