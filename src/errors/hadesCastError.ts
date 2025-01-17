import mongoose from 'mongoose'

import IGenericErrorMessage from '../Interface/error'

const hadesCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message:"invalid id",
    },
  ]
  const statusCode = 400

  return { statusCode, message: 'Cast Error', errorMessages: errors }
}
export default hadesCastError
