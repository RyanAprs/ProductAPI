import type { Request, Response } from 'express'
import { createProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { addProductToDB, getProductFromDB } from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'
import ProductType from '../types/product.type'

export const getProduct = async (req: Request, res: Response) => {
  const products: any = await getProductFromDB()
  const {
    params: { name }
  } = req

  if (name) {
    const filterProduct = products.filter((product: ProductType) => {
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

export const createProduct = async (req: Request, res: Response) => {
  req.body.product_id = uuidv4()
  const { error, value } = createProductValidation(req.body)

  if (error) {
    logger.error('ERR: Product - create = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.details[0].message
    })
  }

  try {
    await addProductToDB(value)
    logger.info('Created product success')
    return res.status(201).send({
      status: true,
      status_code: 201,
      message: 'Created product success'
    })
  } catch (error) {
    logger.error('ERR: Product - create = ', error)
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error
    })
  }
}
