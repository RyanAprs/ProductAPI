import { logger } from './utils/logger'
import createServer from './utils/server'

// connect DB
import './utils/connectDB'

const app = createServer()
const PORT: number = 4000

app.listen(PORT, () => {
  logger.info(`server listening on ${PORT}`)
})
