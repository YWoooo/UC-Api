import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import { getDb } from '@/src/utils/get-db'
import { setRefreshToken } from '@/src/utils/set-jwt-for-auth'
const jwtKey = process.env.JWT_KEY as string;

export const authByToken = (req: Request, res: Response, next: NextFunction) => {
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
    if (e.name === 'TokenExpiredError') {
      authRefreshToken(accountFromBody, req)
    }
    res.status(401).send({ code: 401 })
  }
}

const authAccessToken = (accessToken: string, accountFromDecoded: string, accountFromBody: string, res: Response) => {
  jwt.verify(accessToken, jwtKey)
  res.locals.account = accountFromDecoded
  if (accountFromBody && accountFromBody !== accountFromDecoded) throw new Error
}

const authRefreshToken = async (accountFromBody: string, req: Request) => {
  const tokenFromClient = req.header('RefreshToken')
  if (!tokenFromClient) return 401

  try {
    const db = await getDb()
    const user = await db.collection('loggedin-user').findOne({ account: accountFromBody })
    const tokenFromDb = user.token

    jwt.verify(tokenFromDb, jwtKey)
    if (tokenFromClient !== tokenFromDb) throw new Error

  } catch (e) {
    return 401
  }
}
