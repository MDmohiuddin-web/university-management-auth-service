import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'node:http'
let server: Server
process.on('uncaughtException', error => {
  console.error('uncaughtException we are closing the server ...')
  errorLogger.error(error)
  process.exit(1)
})
const db = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`✌️ Data base connected success fully ✌️`)

    server = app.listen(config.port, () => {
      logger.info(`⛳ Server is running on PORT ${config.port} ⛳`)
    })
  } catch (error) {
    errorLogger.error(`Error connecting to database`)
  }

  process.on('unhandledRejection', error => {
    console.log('unhandledRejection we are closing the server ...')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

db()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
