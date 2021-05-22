import jwt from 'jsonwebtoken'

const jwtKey = process.env.JWT_KEY as string
const accessTokenOptions = {
  expiresIn: '1s'
}
const refreshTokenOptions = {
  expiresIn: '1 day'
}

export const setAccessToken = (account: string) =>
  jwt.sign({ account }, jwtKey, accessTokenOptions)

export const setRefreshToken = (account: string) =>
  jwt.sign({ account }, jwtKey, refreshTokenOptions)
