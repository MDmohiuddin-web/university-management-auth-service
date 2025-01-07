import { IGenericErrorMessage } from './../Interface/error'

import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorResponse } from '../Interface/common'

const handelZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: String(issue.path[issue.path.length - 1]), // Ensure path is a string
      message: issue.message,
    }
  })
  const statusCode = 400
  return {
    statusCode,
    message: 'Zod validation error',
    errorMessages: errors,
  }
}

export default handelZodError
