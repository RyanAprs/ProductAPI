import mongoose, { ConnectOptions } from 'mongoose'
import config from '../config/environment'
import { logger } from './logger'

// mongoose
//   .connect(`${config.db}`)
//   .then(() => {
//     logger.info('Connected to MongoDB')
//   })
//   .catch((eror) => {
//     logger.info('Failed to connect to MongoDB')
//     logger.error(eror)
//     process.exit(1)
//   })

mongoose
  .connect(`${config.db}`, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Failed to connect to MongoDB')
    logger.error(error)
    process.exit(1)
  })
