"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/users/user.route");
const academicSemester_route_1 = require("../modules/academicsemister/academicSemester.route");
const router = express_1.default.Router();
const modulesRoutes = [
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_route_1.AcademicSemesterRoutes,
    },
];
// router.use('/users/', userRoutes)
// router.use('/academic-semesters/', convertYearToNumber,AcademicSemesterRoutes)
// code optimization
modulesRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
