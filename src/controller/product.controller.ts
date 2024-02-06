import type { Request, Response } from 'express'
import { createProductValidation, updateProductValidation } from '../validations/product.validation'
import { logger } from '../utils/logger'
import { addProductToDB, getProductById, getProductFromDB, updateProductById } from '../services/product.service'
import { v4 as uuidv4 } from 'uuid'

export const getProduct = async (req: Request, res: Response) => {
  const products: any = await getProductFromDB()
  const {
    params: { id }
  } = req

  if (id) {
    const product = await getProductById(id)
    if (product) {
      logger.info('Success get Product data')
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: 'Get data product success',
        data: product
      })
    } else {
      logger.info('Data not found')
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: 'Data not found',
        data: {}
      })
    }
  } else {
    logger.info('Success get Product data')
    return res.status(200).send({
      status: true,
      status_code: 200,
      message: 'Get data products success',
      data: products
    })
  }
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

export const updateProduct = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  const { error, value } = updateProductValidation(req.body)

  if (error) {
    logger.error('ERR: Product - create = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.details[0].message
    })
  }

  try {
    const product = await updateProductById(id, value)
    if (product) {
      logger.info('Updated product success')
      return res.status(200).send({
        status: true,
        status_code: 200,
        message: 'Updated product success'
      })
    } else {
      logger.info('Data not found')
      return res.status(404).send({
        status: false,
        status_code: 404,
        message: 'Data not found',
        data: {}
      })
    }
  } catch (error) {
    logger.error('ERR: Product - create = ', error)
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error
    })
  }
}
