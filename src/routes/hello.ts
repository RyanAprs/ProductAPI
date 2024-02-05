import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const HelloRouter: Router = Router()

HelloRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get Hello data')
  res.status(200).send({ message: 'Hello World' })
})
