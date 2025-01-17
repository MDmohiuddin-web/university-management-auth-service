import { z } from 'zod'
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant'

const AcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),

    year: z.string({ required_error: 'Year is required' }),

    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is required',
    }),

    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),

    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
})
// ensure 1: route level :update--=>give me title nnd code,neither
// ensure 2: route level :update--=>Mapping title :code
const UpdateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
        required_error: 'Title is required',
      }).optional(),

      year: z.string({ required_error: 'Year is required' }).optional(),

      code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
        required_error: 'Code is required',
      }).optional(),

      startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
        required_error: 'Start month is required',
      }).optional(),

      endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
        required_error: 'End month is required',
      }).optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either title or code is required or update other fields',
    },
  )
export const AcademicSemesterValidation = {
  AcademicSemesterZodSchema,
  UpdateAcademicSemesterZodSchema,
}
