import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import config from '../../config'
import IGenericErrorMessage from '../../Interface/error'
import validationErrorHandler from '../../errors/validationErrorHandler'
import ApiError from '../../errors/ApiErrors'
import { errorLogger } from '../../shared/logger'
import { ZodError } from 'zod'
import handelZodError from '../../errors/handelZodError'



const globalErrorHandler: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(error)
  config.env === 'development'
    ? console.log(error, 'globalErrorHandler ✌️🧨')
    : errorLogger.error(error, 'globalErrorHandler 😲')

  let statusCode = 500
  let message = 'Something went wrong'
  let errMessage: IGenericErrorMessage[] = []

  /**
   * Handle mongoose validation errors
   */
  if (error.name === 'ValidationError') {
    const simpleErrors = validationErrorHandler(error)
    statusCode = simpleErrors.statusCode
    message = simpleErrors.message
    errMessage = simpleErrors.errorMessages
  } else if (error instanceof ZodError) {
    const simpleErrors = handelZodError(error)
    statusCode = simpleErrors.statusCode
    message = simpleErrors.message
    errMessage = simpleErrors.errorMessages
  } else if (error instanceof ApiError) {
    /**
     * Handle custom API errors
     */
    statusCode = error.statusCode
    message = error.message
    errMessage = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    /**
     * Handle general errors
     */
    message = error.message
    errMessage = error.message
      ? [
          {
            path: '',
            message: error.message,
          },
        ]
      : []
  }

  /**
   * Send the error response
   */
  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages: errMessage,
    stack: config.env !== 'production' ? error.stack : undefined,
  })

  /**
   * Call the next middleware
   */
  next()
}

export default globalErrorHandler
