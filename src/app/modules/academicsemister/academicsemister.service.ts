import status from "http-status";
import ApiError from '../../../errors/ApiErrors'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicsemister.interface'
import { AcademicSemester } from './academicsemister.model'

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
    // autumn -> 01 summer -> 02 fall -> 03
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid Semester Code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

export const academicSemesterService = {
  createSemester,
}
