import { Router } from 'express'
import type { Application, Request, Response, NextFunction } from 'express'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: true, status_code: 200, data: [{ name: 'Laptop', price: 10000000 }] })
})
