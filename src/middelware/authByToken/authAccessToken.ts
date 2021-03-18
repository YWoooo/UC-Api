import jwt from 'jsonwebtoken'
import { Response } from 'express';
const jwtKey = process.env.JWT_KEY as string;

type Code = number

export default function (
  accessToken: string,
  accountFromDecoded: string,
  accountFromBody: string,
  res: Response
): Code {
  try {
    jwt.verify(accessToken, jwtKey)
    res.locals.account = accountFromDecoded
    if (
      accountFromBody &&
      accountFromBody !== accountFromDecoded
    ) throw new Error
    return 200
  } catch (e) {
    return 401
  }
}
