import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';

import { FacultyController } from './faculty.controller';
import ValidationRequest from '../../middlewares/ValidationRequest';
import { FacultyValidation } from './faculty.validations';


const router = express.Router();

router.get(
  '/:id',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.FACULTY
//   ),
  FacultyController.getSingleFaculty
);

router.get(
  '/',
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.FACULTY
//   ),
  FacultyController.getAllFaculties
);

router.patch(
  '/:id',
  ValidationRequest(FacultyValidation.updateFacultyZodSchema),
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultyController.updateFaculty
);

router.delete(
  '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FacultyController.deleteFaculty
);

export const FacultyRoutes = router;
