import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

export const authByToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (!token) return res.status(401).send({ code: 401 })

  const jwtKey = process.env.JWT_KEY as string;
  try {
    const decoded: any = jwt.verify(token, jwtKey)
    res.locals.account = decoded.account
    const accountFromBody = req.body.account
    if (accountFromBody && accountFromBody !== decoded.account) throw new Error
    next()
  } catch (e) {
    res.status(401).send({ code: 401 })
  }
}
