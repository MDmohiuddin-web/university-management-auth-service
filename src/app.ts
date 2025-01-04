import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import UserRouter from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHnadelar'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users/', UserRouter)

// testing
app.get('/', async (req: Request, res: Response) => {
  // throw new ApiError(400, 'Internal Server Error')
  res.send('working successfully')
})
// global error handler
app.use(globalErrorHandler)

export default app
