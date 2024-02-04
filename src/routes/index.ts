import { Application, Router } from 'express'
import { HelloRouter } from './hello'
import { ProductRouter } from './product'

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
