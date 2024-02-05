import { Router } from 'express'
import type { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { createProductValidation } from '../validation/product.validation'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  logger.info('Success get Product data')
  return res.status(200).send({
    status: true,
    status_code: 200,
    message: 'Get data products success',
    data: [{ name: 'Laptop', price: 10000000 }]
  })
})

ProductRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = createProductValidation(req.body)
  if (error) {
    logger.error('ERR: Product - create = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.details[0].message,
      data: {}
    })
  }

  logger.info('Success post new Product data')
  return res.status(200).send({
    status: true,
    status_code: 200,
    message: 'Add new product success',
    data: value
  })
})
