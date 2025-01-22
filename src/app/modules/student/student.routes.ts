import express from 'express'

import { StudentController } from './student.controller'
import ValidationRequest from '../../middlewares/ValidationRequest'
import { StudentValidaion } from './student.validation'

const router = express.Router()


router.get('/:id', StudentController.getSingleStudent)
router.delete('/:id', StudentController.deleteStudent)
router.patch(
  '/:id',
  ValidationRequest(StudentValidaion.updateStudentZodSchema),
  StudentController.updateStudent,
)

router.get('/', StudentController.getAllStudents)
// updateStudent
export const StudentRoutes = router
