import jwt from 'jsonwebtoken'

const jwtKey = process.env.JWT_KEY as string
const options = {
  expiresIn: '1 day'
}

export const setJwtForAuth = (account: string) =>
  jwt.sign({ account }, jwtKey, options)
