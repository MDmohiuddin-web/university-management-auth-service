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
exports.usersService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../../config"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const academicsemister_model_1 = require("../academicsemister/academicsemister.model");
const user_utils_1 = require("./user.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = require("../student/student.model");
const createStudent = (student, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.password) {
        user.password = config_1.default.default_student_pass;
    }
    user.role = 'student';
    const academicSemester = yield academicsemister_model_1.AcademicSemester.findById(student.academicSemester);
    if (!academicSemester) {
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Academic semester not found');
    }
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const id = yield (0, user_utils_1.generateStudentId)(academicSemester);
        user.id = id;
        student.id = id;
        const createdStudent = yield student_model_1.Student.create([student], { session });
        if (!createdStudent.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student');
        }
        user.student = createdStudent[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
    // user => user.student => student=> academicSemester,academic faculty,academicDepartment
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ id: newUserAllData._id }).populate({
            path: 'student',
            populate: [
                {
                    path: 'academicSemester',
                },
                {
                    path: 'academicDepartment',
                },
                {
                    path: 'academicFaculty',
                },
            ],
        });
    }
    return newUserAllData;
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    return users;
});
exports.usersService = {
    createStudent,
    getUsers,
};
