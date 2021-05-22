import handleErrInRoute from '@/src/errors/handleErrInRoute'
import verifyAccessToken from './verifyAccessToken'
import { Request, Response, NextFunction } from 'express';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await verifyAccessToken(req, res, next)
  } catch (error) {
    handleErrInRoute(error, res)
  }
}
