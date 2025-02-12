import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import ValidationRequest from '../../middlewares/ValidationRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/login',
  ValidationRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  '/refresh-token',
  ValidationRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

router.post(
  '/change-password',
  ValidationRequest(AuthValidation.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AuthController.changePassword
);
router.post(
  '/forgot-password',
  AuthController.forgotPass
);

router.post(
  '/reset-password',
  AuthController.resetPassword
);

export const AuthRoutes = router;
