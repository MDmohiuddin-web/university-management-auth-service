import httpStatus from 'http-status'

import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middlewares/globalErrorHnadelar'

import router from './app/routes'
import cookieParser from 'cookie-parser';

const app: Application = express()

app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes multiple routes  added here
app.use('/api/v1/', router)
// app.use('/api/v1/users/', userRoutes)
// academic routes
// app.use('/api/v1/academic-semesters/', convertYearToNumber,AcademicSemesterRoutes)

// testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  //  throw new Error( 'Internal Server Error testing')
  res.send('working successfully')
})
// global error handler
app.use(globalErrorHandler)

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    status: 'fail',
    message: `Can't find'${req.originalUrl}' on this server!`,
    errorMessages: [{ path: `${req.originalUrl}`, message: 'API Not Found' }],
  })
  next()
})



export default app
