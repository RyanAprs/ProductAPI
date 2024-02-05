import { logger } from '../utils/logger'
import productModel from '../models/product.model'
import ProductType from '../types/product.type'

export const getProductFromDB = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data
    })
    .catch((error) => {
      logger.info('Cannot get data from database')
      logger.error(error)
    })
}

export const addProductToDB = async (payload: ProductType) => {
  return await productModel.create(payload)
}
