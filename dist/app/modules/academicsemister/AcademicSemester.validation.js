"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
const AcademicSemesterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constant_1.academicSemesterTitles], {
            required_error: 'Title is required',
        }),
        year: zod_1.z.string({ required_error: 'Year is required' }),
        code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCodes], {
            required_error: 'Code is required',
        }),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: 'Start month is required',
        }),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: 'End month is required',
        }),
    }),
});
// ensure 1: route level :update--=>give me title nnd code,neither
// ensure 2: route level :update--=>Mapping title :code
const UpdateAcademicSemesterZodSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z.enum([...academicSemester_constant_1.academicSemesterTitles], {
            required_error: 'Title is required',
        }).optional(),
        year: zod_1.z.string({ required_error: 'Year is required' }).optional(),
        code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCodes], {
            required_error: 'Code is required',
        }).optional(),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: 'Start month is required',
        }).optional(),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.academicSemesterMonths], {
            required_error: 'End month is required',
        }).optional(),
    }),
})
    .refine(data => (data.body.title && data.body.code) ||
    (!data.body.title && !data.body.code), {
    message: 'Either title or code is required or update other fields',
});
exports.AcademicSemesterValidation = {
    AcademicSemesterZodSchema,
    UpdateAcademicSemesterZodSchema,
};
