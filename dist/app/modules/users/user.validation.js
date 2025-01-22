"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
// Zod Schema
const zod_1 = require("zod");
const student_constant_1 = require("../student/student.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string().optional(),
                lastName: zod_1.z.string().optional(),
                middleName: zod_1.z.string().optional(),
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
            gender: zod_1.z.enum([...student_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            bloodGroup: zod_1.z.enum([...student_constant_1.bloodGroup], {
                required_error: 'Blood group is required',
            }),
            email: zod_1.z.string({
                required_error: 'Email is required',
            }),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact number is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic faculty is required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
            }),
            academicSemester: zod_1.z.string({
                required_error: 'Academic semester is required',
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: "Father's name is required",
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: "Father's occupation is required",
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: "Father's contact number is required",
                }),
                motherName: zod_1.z.string({
                    required_error: "Mother's name is required",
                }),
                motherOccupation: zod_1.z.string({
                    required_error: "Mother's occupation is required",
                }),
                motherContactNo: zod_1.z.string({
                    required_error: "Mother's contact number is required",
                }),
                address: zod_1.z.string({
                    required_error: "Guardian's address is required",
                }),
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: 'Local guardian name is required',
                }),
                occupation: zod_1.z.string({
                    required_error: 'Local guardian occupation is required',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'Local guardian contact number is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Local guardian address is required',
                }),
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
