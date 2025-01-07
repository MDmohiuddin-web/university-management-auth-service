import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middlewares/globalErrorHnadelar'
import { userRoutes } from './app/modules/users/user.route'
import { AcademicSemesterRoutes } from './app/modules/academicsemister/academicSemester.route'
import convertYearToNumber from './app/modules/academicsemister/academicSemester.utils'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users/', userRoutes)
// academic routes
app.use('/api/v1/academic-semesters/', convertYearToNumber,AcademicSemesterRoutes)

// testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  //  throw new Error( 'Internal Server Error testing')
  res.send('working successfully')
})
// global error handler
app.use(globalErrorHandler)

export default app
