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

    year: z.number({ required_error: 'Year is required' }),

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
export const AcademicSemesterValidation = {
  AcademicSemesterZodSchema,
}
