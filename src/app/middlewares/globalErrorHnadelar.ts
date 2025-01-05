import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import IGenericErrorMessage from '../../Interface/error'
import validationErrorHandler from '../../errors/validationErrorHandler'
import ApiError from '../../errors/ApiErrors'

/**
 * Global error handler middleware
 * @param {Error} err - The error object to be handled
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next middleware to be called after this one
 */
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errMessage: IGenericErrorMessage[] = []

  /**
   * Handle mongoose validation errors
   */
  if (err.name === 'ValidationError') {
    const simpleErrors = validationErrorHandler(err)
    statusCode = simpleErrors.statusCode
    message = simpleErrors.message
    errMessage = simpleErrors.errorMessages
  } else if (err instanceof Error) {
  /**
   * Handle general errors
   */
    message = err.message
    errMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof ApiError) {

  /**
   * Handle custom API errors
   */
    statusCode = err.statusCode
    message = err.message
    errMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
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
    stack: config.env !== 'production' ? err.stack : undefined,
  })

  /**
   * Call the next middleware
   */
  next()
}

export default globalErrorHandler
