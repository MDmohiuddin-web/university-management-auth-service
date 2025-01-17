"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ValidationRequest_1 = __importDefault(require("../../middlewares/ValidationRequest"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const academicSemester_validation_1 = require("./academicSemester.validation");
const academicSemester_utils_1 = __importDefault(require("./academicSemester.utils"));
const router = express_1.default.Router();
router.post('/create-semester', academicSemester_utils_1.default, (0, ValidationRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.AcademicSemesterZodSchema), academicSemester_controller_1.AcademicSemesterController.createSemester);
router.patch('/:id', academicSemester_controller_1.AcademicSemesterController.updateSemester);
router.get('/:id', academicSemester_controller_1.AcademicSemesterController.getSingleSemesterById);
router.get('/', academicSemester_controller_1.AcademicSemesterController.getAllSemesters);
exports.AcademicSemesterRoutes = router;
