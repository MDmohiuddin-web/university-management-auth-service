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
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../../config"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const user_utils_1 = require("./user.utils");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // auto inclement the id and default password
    const academicsemister = {
        year: '2025',
        code: '01',
    };
    // const id = await generateStudentId(academicsemister as IAcademicSemester)
    // testing for faculty
    const id = yield (0, user_utils_1.GenerateFacultyId)();
    user.id = id;
    if (!user.password) {
        user.password = config_1.default.default_user_password;
    }
    const createdUser = yield user_model_1.User.create(user);
    if (!createdUser) {
        throw new ApiErrors_1.default(400, 'Failed to create user');
    }
    return createdUser;
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    return users;
});
exports.usersService = {
    createUser, getUsers
};
