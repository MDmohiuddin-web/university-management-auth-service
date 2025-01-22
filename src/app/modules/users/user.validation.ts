

// Zod Schema
import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        middleName: z.string().optional(),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'Blood group is required',
      }),
      email: z.string({
        required_error: 'Email is required',
      }),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: "Father's name is required",
        }),
        fatherOccupation: z.string({
          required_error: "Father's occupation is required",
        }),
        fatherContactNo: z.string({
          required_error: "Father's contact number is required",
        }),
        motherName: z.string({
          required_error: "Mother's name is required",
        }),
        motherOccupation: z.string({
          required_error: "Mother's occupation is required",
        }),
        motherContactNo: z.string({
          required_error: "Mother's contact number is required",
        }),
        address: z.string({
          required_error: "Guardian's address is required",
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guardian name is required',
        }),
        occupation: z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact number is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});


export const UserValidation = {
  createUserZodSchema,
};
