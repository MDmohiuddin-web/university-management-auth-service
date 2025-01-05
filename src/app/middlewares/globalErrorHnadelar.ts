import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import IGenericErrorMessage from '../../Interface/error'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errMessage: IGenericErrorMessage[] = []

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages: errMessage,
    stack: config.env !== 'production' ? err.stack : undefined,
  })
  next()
}

export default globalErrorHandler
