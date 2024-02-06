import { Router } from 'express'
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controller/product.controller'
import { requireAdmin, requireUser } from '../middleware/auth'

export const ProductRouter: Router = Router()

ProductRouter.get('/', getProduct)
ProductRouter.get('/:id', getProduct)
ProductRouter.post('/', requireAdmin, createProduct)
ProductRouter.put('/:id', requireAdmin, updateProduct)
ProductRouter.delete('/:id', requireAdmin, deleteProduct)
