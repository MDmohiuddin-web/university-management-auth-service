import express from 'express'
import ValidationRequest from '../../middlewares/ValidationRequest'
import { AcademicSemesterValidation } from './AcademicSemester.validation'

const router = express.Router()


router.post('/create-semester', ValidationRequest(AcademicSemesterValidation.AcademicSemesterZodSchema))

export const AcademicSemesterRoutes = router