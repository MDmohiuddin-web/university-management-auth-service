import status from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import { IAcademicSemester } from './academicsemister.interface'
import { AcademicSemester } from './academicsemister.model'
import { IPaginationOptions } from '../../../Interface/PaginationOptions'
import { IGenericResponse } from '../../../Interface/common'
import { paginationHelpers } from '../../../helpes/pagenationHelpers'
import { SortOrder } from 'mongoose'

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

const getallSemesters = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const academicSemesterService = {
  createSemester,
  getallSemesters,
}
