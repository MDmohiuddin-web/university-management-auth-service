"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemester = void 0;
const mongoose_1 = require("mongoose");
const academicSemester_constant_1 = require("./academicSemester.constant");
const AcademicSemesterSchema = new mongoose_1.Schema({
    title: { type: String, required: true, enum: academicSemester_constant_1.academicSemesterTitles },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: academicSemester_constant_1.academicSemesterCodes },
    startMonth: { type: String, required: true, enum: academicSemester_constant_1.academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemester_constant_1.academicSemesterMonths },
}, {
    timestamps: true,
});
exports.AcademicSemester = (0, mongoose_1.model)('AcademicSemester', AcademicSemesterSchema);
