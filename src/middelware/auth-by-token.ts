import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { getDb } from '@/src/utils/get-db'
import { setRefreshToken } from '@/src/utils/set-jwt-for-auth'
const jwtKey = process.env.JWT_KEY as string;

export const authByToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header('Authorization')?.replace('Bearer ', '')
  if (!accessToken) return 401

  const accountFromDecoded = (jwt.decode(accessToken) as any).account // jwt.decode(accessToken) return an object, the annotation of it is wrong.
  const accountFromBody = req.body.account

  try {
    authAccessToken(
      accessToken,
      accountFromDecoded,
      accountFromBody,
      res
    )
    next()
  } catch (e) {
    let code = 401
    if (e.name === 'TokenExpiredError') {
      code = await authRefreshToken(accountFromDecoded, req) || 500
    }
    res.status(code).send({ code })
  }
}

const authAccessToken = (accessToken: string, accountFromDecoded: string, accountFromBody: string, res: Response) => {
  jwt.verify(accessToken, jwtKey)
  res.locals.account = accountFromDecoded
  if (accountFromBody && accountFromBody !== accountFromDecoded) throw new Error
}

const authRefreshToken = async (account: string, req: Request) => {
  const tokenFromClient = req.header('RefreshToken')
  if (!tokenFromClient) return 401
  try {
    jwt.verify(tokenFromClient, jwtKey)
  } catch (e) {
    return 401
  }

  try {
    const db = await getDb()
    const user = await db.collection('loggedin-user').findOne({ account })
    const tokenFromDb = user.refreshToken
    return tokenFromClient === tokenFromDb ? 200 : 401
  } catch (e) {
    return 500
  }
}
