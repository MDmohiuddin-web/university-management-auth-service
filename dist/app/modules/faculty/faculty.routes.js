"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faculty_controller_1 = require("./faculty.controller");
const ValidationRequest_1 = __importDefault(require("../../middlewares/ValidationRequest"));
const faculty_validations_1 = require("./faculty.validations");
const router = express_1.default.Router();
router.get('/:id', 
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.FACULTY
//   ),
faculty_controller_1.FacultyController.getSingleFaculty);
router.get('/', 
//   auth(
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.FACULTY
//   ),
faculty_controller_1.FacultyController.getAllFaculties);
router.patch('/:id', (0, ValidationRequest_1.default)(faculty_validations_1.FacultyValidation.updateFacultyZodSchema), 
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
faculty_controller_1.FacultyController.updateFaculty);
router.delete('/:id', 
//   auth(ENUM_USER_ROLE.SUPER_ADMIN),
faculty_controller_1.FacultyController.deleteFaculty);
exports.FacultyRoutes = router;
