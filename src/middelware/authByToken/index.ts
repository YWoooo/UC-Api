// Utils.
import getParams from './getParams'
import authAccessToken from './authAccessToken'
import authRefreshToken from './authRefreshToken'
// Types.
import { Request, Response, NextFunction } from 'express';

export default async function (req: Request, res: Response, next: NextFunction) {
  const {
    accessToken,
    accountFromDecoded,
    accountFromBody
  } = getParams(req)
  try {
    if (!accessToken) throw new Error
    const code = authAccessToken(
      accessToken,
      accountFromDecoded,
      accountFromBody,
      res
    )
    if (code === 401) throw new Error('TokenExpiredError')
    next()
  } catch (e) {
    if (e.message === 'TokenExpiredError') {
      const { code, accessToken, refreshToken } =
        await authRefreshToken(accountFromDecoded, req)
      res.status(code)
      res.setHeader('AccessToken', accessToken || '')
      res.setHeader("RefreshToken", refreshToken || '')
      res.locals.account = accountFromDecoded
      next()
    } else {
      res.status(401).send({ code: 401 })
    }
  }
}
