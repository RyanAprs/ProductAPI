import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get Product data')
  res.status(200).send({ status: true, status_code: 200, data: [{ name: 'Laptop', price: 10000000 }] })
})

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success post new Product data')
  res.status(200).send({ status: true, status_code: 200, data: req.body })
})
