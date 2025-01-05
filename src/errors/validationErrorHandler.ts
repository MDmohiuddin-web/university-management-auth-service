import mongoose from 'mongoose'
import IGenericErrorMessage from '../Interface/error'
import { IGenericErrorResponse } from '../Interface/common'

const validationErrorHandler = (err: mongoose.Error.ValidationError):IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    },
  )
  const statusCode = 400

  return { statusCode, message: 'Validation Error', errorMessages: errors }
}

export default validationErrorHandler
