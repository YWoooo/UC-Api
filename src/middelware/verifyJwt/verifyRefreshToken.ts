import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
// Utils.
import CustomError from '@/src/errors/prototype'
import { setAccessToken, setRefreshToken } from '@/src/utils/set-jwt-for-auth'
import { getDb } from '@/src/utils/get-db'

const jwtKey = process.env.JWT_KEY as string;

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const refreshToken = req.header('refreshToken')
  if (!refreshToken) {
    throw noRefreshTokenError
  }
  verify(refreshToken)
  await checkDBAndSetHeader(res, refreshToken)
  next()
}

const verify = (refreshToken: string) => {
  try {
    jwt.verify(refreshToken, jwtKey)
  } catch (e) {
    throw verifyFailError
  }
}
const checkDBAndSetHeader = async (res: Response, refreshToken: string) => {
  const account = (jwt.decode(refreshToken) as any).account
  const newRefreshToken = setRefreshToken(account)
  const db = await getDb()
  const query = {
    account,
    refreshToken
  }
  const update = {
    $set: {
      refreshToken: newRefreshToken
    }
  }
  // TODO: cross device token.
  const user = await db.collection('loggedin-user')
    .findOneAndUpdate(query, update)
  if (!user.value) {
    const error = verifyFailError
    error.message =
      'Didn\'t find any user in loggedin-user collection.'
    throw error
  }
  res.setHeader('accessToken', setAccessToken(account))
  res.setHeader("refreshToken", newRefreshToken)
  res.locals.account = account
}

const noRefreshTokenError = new CustomError({
  name: 'NoRefreshTokenError',
  status: 401
})
const verifyFailError = new CustomError({
  name: 'VerifyFailError',
  status: 401,
  message: 'RefreshToken verify fail.'
})
