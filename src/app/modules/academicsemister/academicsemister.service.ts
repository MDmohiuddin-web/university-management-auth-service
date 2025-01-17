import status from 'http-status'
import ApiError from '../../../errors/ApiErrors'
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant'
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academicsemister.interface'
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
  filters: IAcademicSemesterFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  if (searchTerm) {
    const orConditions = academicSemesterSearchableFields.map(field => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    }))
    andConditions.push({ $or: orConditions })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([key, value]) => {
        return { [key]: value } // Return the condition object here
      }),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await AcademicSemester.find(whereConditions)
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
const getSingleSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}
const updateSemester = async (
  id: string,

  payload: Partial<IAcademicSemester>,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export const academicSemesterService = {
  createSemester,
  getallSemesters,
  getSingleSemester,
  updateSemester,
}
