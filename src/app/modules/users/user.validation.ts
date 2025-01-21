import { z } from 'zod'
import { bloodGroup, gender } from '../student/student.constant'

const createUserZodSchema = z.object({
  body: z.object({
    // role: z.string({
    //   required_error: 'Role is required',
    // }),
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z
          .string({
            required_error: 'First name is',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'lastName name is',
          })
          .optional(),
        middleName: z
          .string({
            required_error: 'middleName name is',
          })
          .optional(),
      }),
      
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
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
  }),
})

export const UserValidation = {
  createUserZodSchema,
}
