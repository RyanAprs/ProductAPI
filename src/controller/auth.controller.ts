import type { Request, Response } from 'express'
import { createUserValidation } from '../validations/auth.validation'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '../utils/logger'
import { hashing } from '../utils/hashing'
import { createUser } from '../services/auth.service'

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
