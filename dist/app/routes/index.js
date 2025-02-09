"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/users/user.routes");
const academicSemester_routes_1 = require("../modules/academicsemister/academicSemester.routes");
const academicFaculty_routes_1 = require("../modules/academicFaculty/academicFaculty.routes");
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const student_routes_1 = require("../modules/student/student.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const router = express_1.default.Router();
const modulesRoutes = [
    {
        path: '/users',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_routes_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_routes_1.academicDepartmentFacultyRoutes,
    },
    {
        path: '/academic-department',
        route: academicDepartment_routes_1.AcademicDepartmentRoutes,
    },
    {
        path: '/students',
        route: student_routes_1.StudentRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
];
// router.use('/users/', userRoutes)
// router.use('/academic-semesters/', convertYearToNumber,AcademicSemesterRoutes)
// code optimization
modulesRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
