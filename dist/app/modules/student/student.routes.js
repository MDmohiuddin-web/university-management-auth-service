"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("./student.controller");
const ValidationRequest_1 = __importDefault(require("../../middlewares/ValidationRequest"));
const student_validation_1 = require("./student.validation");
const router = express_1.default.Router();
router.get('/:id', student_controller_1.StudentController.getSingleStudent);
router.delete('/:id', student_controller_1.StudentController.deleteStudent);
router.patch('/:id', (0, ValidationRequest_1.default)(student_validation_1.StudentValidaion.updateStudentZodSchema), student_controller_1.StudentController.updateStudent);
router.get('/', student_controller_1.StudentController.getAllStudents);
// updateStudent
exports.StudentRoutes = router;
