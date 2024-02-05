import type { Application, Router } from 'express'
import { HelloRouter } from './hello.route'
import { ProductRouter } from './product.route'

const _routes: Array<[string, Router]> = [
  ['/hello', HelloRouter],
  ['/product', ProductRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
