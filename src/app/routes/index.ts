import express from 'express'
import { userRoutes } from '../modules/users/user.routes'

import { AcademicSemesterRoutes } from '../modules/academicsemister/academicSemester.routes'
const router = express.Router()

const modulesRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
]

// router.use('/users/', userRoutes)
// router.use('/academic-semesters/', convertYearToNumber,AcademicSemesterRoutes)
// code optimization
modulesRoutes.forEach(route => router.use(route.path, route.route))

export default router
