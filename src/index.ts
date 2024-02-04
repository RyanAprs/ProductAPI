import express from 'express'
import type { Application } from 'express'
import { routes } from './routes'

const app: Application = express()
const PORT: number = 4000

routes(app)

app.listen(PORT, () => console.log(`server listening on ${PORT}`))
