import type { Request, Response } from 'express'
import { createSessionValidation, createUserValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { checkPassword, hashing } from '../utils/hashing'
import { createUser, findUserByEmail } from '../services/auth.service'
import { signJWT } from '../utils/jwt'

export const registerUser = async (req: Request, res: Response) => {
  req.body.user_id = uuidv4()
  const { error, value } = await createUserValidation(req.body)

  if (error) {
    logger.error('ERR: Auth - register = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.details[0].message
    })
  }

  try {
    // hash password
    const hashedPassword = hashing(value.password)
    value.password = hashedPassword

    await createUser(value)
    logger.info('Success register user')
    return res.status(201).json({
      status: true,
      status_code: 201,
      message: 'Success register user'
    })
  } catch (error) {
    logger.error('ERR: Auth - register = ', error)
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error
    })
  }
}

export const createSession = async (req: Request, res: Response) => {
  const { error, value } = createSessionValidation(req.body)

  if (error) {
    logger.error('ERR: Auth - create session = ', error.details[0].message)
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error.details[0].message
    })
  }

  try {
    const user: any = await findUserByEmail(value.email)

    // Compare the password
    const isValid = checkPassword(value.password, user.password)
    if (!isValid) {
      return res.status(401).json({ status: false, status_code: 401, message: 'Invalid email or password' })
    }

    const accessToken = signJWT({ ...user }, { expiresIn: '1d' })
    logger.info('Success login user')
    return res.status(200).send({ status: true, status_code: 200, message: 'Login success', data: { accessToken } })
  } catch (error: any) {
    logger.error('ERR: Auth - create session = ', error)
    return res.status(422).send({
      status: false,
      status_code: 422,
      message: error
    })
  }
}
