import type { Request, Response } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'

export const getProduct = (req: Request, res: Response) => {
  const products = [
    {
      name: 'laptop',
      price: 20000000
    },
    {
      name: 'ipad',
      price: 4000000
    }
  ]
  const {
    params: { name }
  } = req

  if (name) {
    const filterProduct = products.filter((product) => {
      if (product.name === name) {
        return product
      }
    })

    if (filterProduct.length === 0) {
      logger.info('Data not found')
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: 'Data not found',
        data: {}
      })
    }

    logger.info('Success get Product data')
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: 'Get data products success',
      data: filterProduct[0]
    })
  }

  logger.info('Success get Product data')
  return res.status(200).send({
    status: true,
    status_code: 200,
    message: 'Get data products success',
    data: products
  })
}

export const createProduct = (req: Request, res: Response) => {
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
}
