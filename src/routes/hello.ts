import { Router } from 'express'
import type { Application, Request, Response, NextFunction } from 'express'

export const HelloRouter: Router = Router()

HelloRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ message: 'Hello World' })
})
