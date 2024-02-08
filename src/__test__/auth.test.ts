import supertest from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import createServer from '../utils/server'
import { v4 as uuidv4 } from 'uuid'
import { createUser } from '../services/auth.service'
import { hashing } from '../utils/hashing'

const app = createServer()

const userAdmin = {
  user_id: uuidv4(),
  email: 'admin@gmail.com',
  name: 'admin',
  password: `${hashing('123456')}`,
  role: 'admin'
}

const userRegular = {
  user_id: uuidv4(),
  email: 'ryan@gmail.com',
  name: 'Ryan',
  password: `${hashing('123456')}`,
  role: 'regular'
}

const userAdminCreated = {
  email: 'admin123@gmail.com',
  name: 'admin',
  password: '123456',
  role: 'admin'
}

const userRegularCreated = {
  email: 'user@gmail.com',
  name: 'Ryan',
  password: '123456'
}

const userAdminLogin = {
  email: 'admin@gmail.com',
  password: '123456'
}

const userNotExist = {
  email: 'usernotexist@gmail.com',
  password: '123456'
}

describe('auth', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
    await createUser(userAdmin)
    await createUser(userRegular)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('register', () => {
    describe('create user with role admin', () => {
      it('should return 201, success create user admin', async () => {
        await supertest(app).post('/auth/register').send(userAdminCreated).expect(201)
      })
    })
    describe('create user with role regular', () => {
      it('should return 201, success create user regular', async () => {
        await supertest(app).post('/auth/register').send(userRegularCreated).expect(201)
      })
    })
  })

  describe('login', () => {
    describe('login with exist user', () => {
      it('should return 200, return access token & refresh token', async () => {
        await supertest(app).post('/auth/login').send(userAdminLogin).expect(200)
      })
    })
    describe('login with not exist user', () => {
      it('should return 422, login failed', async () => {
        await supertest(app).post('/auth/login').send(userNotExist).expect(422)
      })
    })
  })
})
