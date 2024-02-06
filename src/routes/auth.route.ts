import { Router } from 'express'
import { registerUser, createSession } from '../controller/auth.controller'

export const AuthRouter: Router = Router()

AuthRouter.post('/register', registerUser)
AuthRouter.post('/login', createSession)
