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
const router = express_1.default.Router();
router.post('/create-semester', (0, ValidationRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.AcademicSemesterZodSchema), academicSemester_controller_1.AcademicSemesterController.createSemester);
router.patch('/:id', (0, ValidationRequest_1.default)(academicSemester_validation_1.AcademicSemesterValidation.UpdateAcademicSemesterZodSchema), academicSemester_controller_1.AcademicSemesterController.updateSemester);
// ensure 1: route level :update--=>give me title nnd code,neither
// ensure 2: route level :update--=>Mapping title :code
router.get('/:id', academicSemester_controller_1.AcademicSemesterController.getSingleSemesterById);
router.delete('/:id', academicSemester_controller_1.AcademicSemesterController.deleteSemester);
router.get('/', academicSemester_controller_1.AcademicSemesterController.getAllSemesters);
exports.AcademicSemesterRoutes = router;
