import express from 'express'
import { userRoutes } from '../modules/users/user.routes'

import { AcademicSemesterRoutes } from '../modules/academicsemister/academicSemester.routes'

import { academicDepartmentFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes'
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes'
import { StudentRoutes } from '../modules/student/student.routes'

const router = express.Router()

const modulesRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },{
    path:"/academic-faculty",
    route:academicDepartmentFacultyRoutes
  }
  ,{
    path:"/academic-department",
    route:AcademicDepartmentRoutes
  }
  ,{
    path: '/students',
    route: StudentRoutes,
  }
]

// router.use('/users/', userRoutes)
// router.use('/academic-semesters/', convertYearToNumber,AcademicSemesterRoutes)
// code optimization
modulesRoutes.forEach(route => router.use(route.path, route.route))

export default router
