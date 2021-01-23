import jwt from 'jsonwebtoken'
const jwtKey = process.env.JWT_KEY as string;
import { Request } from 'express';
// Utils.
import { getDb } from '@/src/utils/get-db'
import { setAccessToken, setRefreshToken } from '@/src/utils/set-jwt-for-auth'

type Code = number
interface Res {
  code: Code
  accessToken?: string
  refreshToken?: string
}

export default async function (account: string, req: Request): Promise<Res> {

  const token = req.header('RefreshToken')
  if (!token) return { code: 401 }

  let code = 0
  code = checkToken(token)
  if (code) return { code }

  return await checkIsAuthed(account, token)
}

function checkToken(token: string | undefined): Code {
  if (!token) return 401
  try {
    jwt.verify(token, jwtKey)
    return 0
  } catch (e) {
    return 401
  }
}

async function checkIsAuthed(account: string, token: string): Promise<Res> {
  try {
    const db = await getDb()
    const query = {
      account,
      refreshToken: token
    }
    const newRefreshToken = setRefreshToken(account)
    const update = {
      $set: {
        refreshToken: newRefreshToken
      }
    }

    const res = await db
      .collection('loggedin-user')
      .findOneAndUpdate(query, update)

    return res.value
      ? {
        code: 200,
        refreshToken: newRefreshToken,
        accessToken: setAccessToken(account)
      }
      : { code: 401 }

  } catch {
    return { code: 500 }
  }
}
