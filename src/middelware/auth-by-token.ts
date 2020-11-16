import { res401, res500 } from '../configs/common-reses'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

export const authByToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) return res.status(401).send(res401)

    const jwtKey = process.env.JWT_KEY as string;
    jwt.verify(token, jwtKey, err => {
      if (err) return res.status(401).send(res401)
    })

    next()
  } catch (e) {
    console.log('In authByToken: ', e)
    res.status(500).send(res500)
  }
}
