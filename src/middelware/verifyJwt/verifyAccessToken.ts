import jwt from 'jsonwebtoken'
import CustomError from '@/src/errors/prototype'
import verifyRefreshToken from './verifyRefreshToken'
import { Request, Response, NextFunction } from 'express';
const jwtKey = process.env.JWT_KEY as string;

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.header('Authorization')?.replace('Bearer ', '')
  try {
    if (!accessToken) {
      throw noAccessTokenError
    }
    jwt.verify(accessToken, jwtKey)

    const account = (jwt.decode(accessToken) as any).account
    const accountFromBody = req.body.account
    const accountNotMatch = accountFromBody && account !== accountFromBody
    if (accountNotMatch) {
      throw accountNotMatchError
    }

    res.locals.account = account
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      await verifyRefreshToken(req, res, next)
      return
    }
    else if (error instanceof CustomError) {
      throw error
    } else {
      throw verifyFailError
    }
  }
}

const noAccessTokenError = new CustomError({
  name: 'NoAccessTokenError',
  status: 401
})
const accountNotMatchError = new CustomError({
  name: 'AccountNotMatchError',
  status: 401,
  message: 'AccessToken verified, yet accountFromBody !== accountFromDecoded'
})
const verifyFailError = new CustomError({
  name: 'VerifyFailError',
  status: 401,
  message: 'AccessToken verify fail.'
})