import { Request } from 'express';
import jwt from 'jsonwebtoken'

interface Params {
  accessToken: string;
  accountFromDecoded: string;
  accountFromBody: string;
}

export default function (req: Request): Params {
  const accessToken = req.header('Authorization')?.replace('Bearer ', '')
  if (!accessToken) return {
    accessToken: '',
    accountFromDecoded: '',
    accountFromBody: ''
  }

  return {
    // jwt.decode(accessToken) return an object, the annotation of it is wrong.
    accessToken,
    accountFromDecoded: (jwt.decode(accessToken) as any).account,
    accountFromBody: req.body.account
  }
}