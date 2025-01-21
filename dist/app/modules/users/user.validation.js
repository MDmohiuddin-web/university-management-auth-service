"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const student_constant_1 = require("../student/student.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        // role: z.string({
        //   required_error: 'Role is required',
        // }),
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z
                    .string({
                    required_error: 'First name is',
                })
                    .optional(),
                lastName: zod_1.z
                    .string({
                    required_error: 'lastName name is',
                })
                    .optional(),
                middleName: zod_1.z
                    .string({
                    required_error: 'middleName name is',
                })
                    .optional(),
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required',
            }),
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
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
