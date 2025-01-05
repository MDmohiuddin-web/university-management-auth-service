import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middlewares/globalErrorHnadelar'
import { userRoutes } from './app/modules/users/user.route'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users/', userRoutes)

// testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // throw new ApiError(400, 'Internal Server Error')
  res.send('working successfully')
})
// global error handler
app.use(globalErrorHandler)

export default app
