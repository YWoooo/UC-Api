import jwt from 'jsonwebtoken'

const jwtKey = process.env.JWT_KEY as string
const accessTokenOptions = {
  expiresIn: '15m'
}
const refreshTokenOptions = {
  expiresIn: '30 days'
}

export const setAccessToken = (account: string) =>
  jwt.sign({ account }, jwtKey, accessTokenOptions)

export const setRefreshToken = (account: string) =>
  jwt.sign({ account }, jwtKey, refreshTokenOptions)
