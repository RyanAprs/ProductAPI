import { Router } from 'express'
import { registerUser } from '../controller/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', registerUser)
