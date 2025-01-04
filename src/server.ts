import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger,  } from './shared/logger'

const db = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`✌️ Data base connected success fully ✌️`)

    app.listen(config.port, () => {
      logger.info(`Server is running on PORT ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Error connecting to database`)
  }
}

db()
