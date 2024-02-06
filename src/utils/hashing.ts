import bcrypt from 'bcrypt'

// encode
export const hashing = (password: string) => {
  return bcrypt.hashSync(password, 10)
}
