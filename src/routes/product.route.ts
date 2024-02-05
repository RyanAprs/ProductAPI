import { Router } from 'express'
import { createProduct, getProduct } from '../controller/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getProduct)
ProductRouter.get('/:name', getProduct)
ProductRouter.post('/', createProduct)
