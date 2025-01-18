"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicDepartmentFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../middlewares/ValidationRequest"));
const academicFaculty_validation_1 = require("./academicFaculty.validation");
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const router = express_1.default.Router();
router.post('/create-faculty', (0, ValidationRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.createAcademicFacultyZodSchema), academicFaculty_controller_1.academicFacultyController.createAcademicFaculty);
router.get('/', academicFaculty_controller_1.academicFacultyController.getAllAcademicFaculty);
router.get('/:id', academicFaculty_controller_1.academicFacultyController.getSingleAcademicFaculty);
router.patch('/:id', (0, ValidationRequest_1.default)(academicFaculty_validation_1.academicFacultyValidation.updateAcademicFacultyZodSchema), academicFaculty_controller_1.academicFacultyController.updateAcademicFaculty);
router.delete('/:id', academicFaculty_controller_1.academicFacultyController.deleteAcademicFaculty);
exports.academicDepartmentFacultyRoutes = router;
