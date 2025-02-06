"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const ValidationRequest_1 = __importDefault(require("../../middlewares/ValidationRequest"));
const router = express_1.default.Router();
// router.post(
//   '/create-user',
//   ValidationRequest(UserValidation.createUserZodSchema),
//   UserController.createUser,
// )
router.post('/create-student', (0, ValidationRequest_1.default)(user_validation_1.UserValidation.createStudentZodSchema), user_controller_1.UserController.createStudent);
router.post('/create-faculty', (0, ValidationRequest_1.default)(user_validation_1.UserValidation.createFacultyZodSchema), 
// auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.createFaculy);
// router.post(
//   '/create-admin',
//   ValidationRequest(UserValidation.createAdminZodSchema),
//   // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
//   UserController.createAdmin
// );
exports.userRoutes = router;
