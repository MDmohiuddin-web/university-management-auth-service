"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHnadelar_1 = __importDefault(require("./app/middlewares/globalErrorHnadelar"));
const user_route_1 = require("./app/modules/users/user.route");
const academicSemester_route_1 = require("./app/modules/academicsemister/academicSemester.route");
const academicSemester_utils_1 = __importDefault(require("./app/modules/academicsemister/academicSemester.utils"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// application routes
app.use('/api/v1/users/', user_route_1.userRoutes);
// academic routes
app.use('/api/v1/academic-semesters/', academicSemester_utils_1.default, academicSemester_route_1.AcademicSemesterRoutes);
// testing
app.get('/', (req, res, next) => {
    //  throw new Error( 'Internal Server Error testing')
    res.send('working successfully');
});
// global error handler
app.use(globalErrorHnadelar_1.default);
exports.default = app;
