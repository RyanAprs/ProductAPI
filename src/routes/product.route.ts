import { Router } from 'express'
import { createProduct, getProduct, updateProduct } from '../controller/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', createProduct)
ProductRouter.put('/:id', updateProduct)
