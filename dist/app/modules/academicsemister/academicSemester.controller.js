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
exports.AcademicSemesterController = void 0;
const academicsemister_service_1 = require("./academicsemister.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagenation_1 = require("../../../conostants/pagenation");
const academicSemester_constant_1 = require("./academicSemester.constant");
const createSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemesterData = __rest(req.body, []);
    const result = yield academicsemister_service_1.academicSemesterService.createSemester(academicSemesterData);
    (0, sendResponse_1.default)(res, {
        message: 'semester created successfully',
        success: true,
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const getAllSemesters = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign({ searchTerm: '' }, (0, pick_1.default)(req.query, academicSemester_constant_1.academicSemesterFilterableFinds));
    const paginationOptions = (0, pick_1.default)(req.query, pagenation_1.paginationFields);
    const result = yield academicsemister_service_1.academicSemesterService.getallSemesters(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        meta: result.meta,
        message: 'Semester retrieved successfully',
        success: true,
        statusCode: http_status_1.default.OK,
        data: result.data,
    });
}));
const getSingleSemesterById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicsemister_service_1.academicSemesterService.getSingleSemester(id);
    (0, sendResponse_1.default)(res, {
        message: 'Semester retrieved successfully',
        success: true,
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const updateSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield academicsemister_service_1.academicSemesterService.updateSemester(id, updatedData);
    (0, sendResponse_1.default)(res, {
        message: 'Semester updated successfully',
        success: true,
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const deleteSemester = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicsemister_service_1.academicSemesterService.deleteSemester(id);
    (0, sendResponse_1.default)(res, {
        message: 'Semester deleted successfully',
        success: true,
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
exports.AcademicSemesterController = {
    createSemester,
    getAllSemesters,
    getSingleSemesterById,
    updateSemester,
    deleteSemester,
};
