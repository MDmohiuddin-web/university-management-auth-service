import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpes/pagenationHelpers'
import { IGenericResponse } from '../../../Interface/common'
import { academicSemesterFilterableFinds } from '../academicsemister/academicSemester.constant'
import { IAcademicFaculty, IAcademicFacultyFilters } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'
import { IPaginationOptions } from '../../../Interface/PaginationOptions'
const createAcademicFaculty= async (
  academicFacultyData: IAcademicFaculty,
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(academicFacultyData)
  return result
}
const getAllAcademicFaculty = async (
  filters: IAcademicFacultyFilters,
  PaginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(PaginationOptions)
  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterFilterableFinds.map(item => ({
        [item]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        return { [field]: value } // Return the condition object here
      }),
    })
  }
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await AcademicFaculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicFaculty.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleAcademicFaculty = async (
  id: string,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}
const deleteAcademicFaculty = async (
  id: string,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id)
  return result
}

export const academicFacultyService = {
  getAllAcademicFaculty,
  updateAcademicFaculty,deleteAcademicFaculty,
  getSingleAcademicFaculty,createAcademicFaculty
}
