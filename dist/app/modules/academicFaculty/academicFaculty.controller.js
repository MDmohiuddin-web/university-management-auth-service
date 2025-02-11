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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicFacultyController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const academicFaculty_service_1 = require("./academicFaculty.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const academicFaculty_conostants_1 = require("./academicFaculty.conostants");
const pagenation_1 = require("../../../conostants/pagenation");
const createAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicFacultyData = __rest(req.body, []);
    const result = yield academicFaculty_service_1.academicFacultyService.createAcademicFaculty(academicFacultyData);
    (0, sendResponse_1.default)(res, {
        message: 'Faculty created successfully',
        success: true,
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const getAllAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(res.header.authorization);
    console.log(req.user);
    // uper 2 lines se user ki data nai
    const filters = (0, pick_1.default)(req.query, academicFaculty_conostants_1.academicFacultyFilterableFields);
    const PaginationOptions = (0, pick_1.default)(req.query, pagenation_1.paginationFields);
    const result = yield academicFaculty_service_1.academicFacultyService.getAllAcademicFaculty(filters, PaginationOptions);
    (0, sendResponse_1.default)(res, {
        message: 'Faculty retrieved successfully',
        success: true,
        statusCode: http_status_1.default.OK,
        data: result.data,
        meta: result.meta,
    });
}));
const getSingleAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicFaculty_service_1.academicFacultyService.getSingleAcademicFaculty(id);
    (0, sendResponse_1.default)(res, {
        message: 'Faculty retrieved successfully',
        success: true,
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const updateAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield academicFaculty_service_1.academicFacultyService.updateAcademicFaculty(id, updatedData);
    (0, sendResponse_1.default)(res, {
        message: 'Faculty updated successfully',
        success: true,
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const deleteAcademicFaculty = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicFaculty_service_1.academicFacultyService.deleteAcademicFaculty(id);
    (0, sendResponse_1.default)(res, {
        message: 'Faculty deleted successfully',
        success: true,
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
exports.academicFacultyController = {
    getSingleAcademicFaculty,
    updateAcademicFaculty,
    deleteAcademicFaculty,
    createAcademicFaculty,
    getAllAcademicFaculty,
};
