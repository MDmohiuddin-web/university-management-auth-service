import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { academicFacultyService } from './academicFaculty.service'
import { IAcademicFaculty } from './academicFaculty.interface'
import pick from '../../../shared/pick'
import { academicFacultyFilterableFields } from './academicFaculty.conostants'
import { paginationFields } from '../../../conostants/pagenation'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFacultyData } = req.body
    const result =
      await academicFacultyService.createAcademicFaculty(academicFacultyData)
    sendResponse<IAcademicFaculty>(res, {
      message: 'Faculty created successfully',
      success: true,
      statusCode: httpStatus.OK,
      data: result,
    })
  },
)
const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(res.header.authorization);
    console.log(req.user);
   
    const filters = pick(req.query, academicFacultyFilterableFields)
    const PaginationOptions = pick(req.query, paginationFields)
    const result = await academicFacultyService.getAllAcademicFaculty(
      filters,
      PaginationOptions,
    )
    sendResponse<IAcademicFaculty[]>(res, {
      message: 'Faculty retrieved successfully',
      success: true,
      statusCode: httpStatus.OK,
      data: result.data,
      meta: result.meta,
    })
  },
)

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await academicFacultyService.getSingleAcademicFaculty(id)
    sendResponse<IAcademicFaculty>(res, {
      message: 'Faculty retrieved successfully',
      success: true,
      statusCode: httpStatus.OK,
      data: result,
    })
  },
)

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedData = req.body
    const result = await academicFacultyService.updateAcademicFaculty(
      id,
      updatedData,
    )
    sendResponse<IAcademicFaculty>(res, {
      message: 'Faculty updated successfully',
      success: true,
      statusCode: httpStatus.OK,
      data: result,
    })
  },
)

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await academicFacultyService.deleteAcademicFaculty(id)
    sendResponse<IAcademicFaculty>(res, {
      message: 'Faculty deleted successfully',
      success: true,
      statusCode: httpStatus.OK,
      data: result,
    })
  },
)

export const academicFacultyController = {
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
  createAcademicFaculty,
  getAllAcademicFaculty,
}
