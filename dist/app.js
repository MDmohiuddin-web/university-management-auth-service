"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHnadelar_1 = __importDefault(require("./app/middlewares/globalErrorHnadelar"));
const routes_1 = __importDefault(require("./app/routes"));
const user_utils_1 = require("./app/modules/users/user.utils");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// application routes
app.use('/api/v1/', routes_1.default);
// app.use('/api/v1/users/', userRoutes)
// academic routes
// app.use('/api/v1/academic-semesters/', convertYearToNumber,AcademicSemesterRoutes)
// testing
app.get('/', (req, res, next) => {
    //  throw new Error( 'Internal Server Error testing')
    res.send('working successfully');
});
// global error handler
app.use(globalErrorHnadelar_1.default);
// handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        status: 'fail',
        message: `Can't find'${req.originalUrl}' on this server!`,
        errorMessages: [{ path: `${req.originalUrl}`, message: 'API Not Found' }],
    });
    next();
});
// test the GenerateFacultyId function
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    const testId = yield (0, user_utils_1.GenerateFacultyId)();
    console.log('testId', testId);
});
test();
exports.default = app;
