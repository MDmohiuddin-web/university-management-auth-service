import express from 'express'
import { UserController } from './user.controllers'
import { UserValidation } from './user.validation'
import ValidationRequest from '../../middlewares/ValidationRequest'

const router = express.Router()
router.post('/create-user', ValidationRequest(UserValidation.createUserZodSchema),UserController.createUser)

export const userRoutes = router
