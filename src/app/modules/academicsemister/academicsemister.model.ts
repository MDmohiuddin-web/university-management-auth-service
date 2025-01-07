import { model, Schema } from 'mongoose'
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicsemister.interface'
import { academicSemesterCodes, academicSemesterMonths, academicSemesterTitles } from './academicSemester.constant'

 

const AcademicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: academicSemesterTitles },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: academicSemesterCodes},
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  {
    timestamps: true,
  },
)

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  AcademicSemesterSchema,
)
