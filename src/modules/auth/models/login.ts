// Utils & configs.
import { getDb } from '@/src/utils/get-db'
import { setAccessToken, setRefreshToken } from '@/src/utils/set-jwt-for-auth';
import { resCode } from '@/src/configs/resCode'
// Types.
import { Res } from '@/src/types/res';
import { RegisterParams } from '../types/registerData'
import { Db } from 'mongodb';
interface ResData {
  accessToken: string;
  refreshToken: string;
}

export const login = async ({ email, password }: RegisterParams): Promise<Res> => {
  try {
    const db = await getDb()
    const users = db.collection('user')
    const user = await users.findOne({ email })

    if (!user) return { code: resCode.notExistUser }
    if (user?.password !== password) return { code: resCode.wrongAccountOrPassword }

    const headers = {
      accessToken: setAccessToken(user.account),
      refreshToken: await storeRefreshToken(db, user.account)
    }

    return {
      code: 201,
      headers
    }
  } catch (e) {
    console.log('In login model: ', e)
    return { code: 500 }
  }
}

const storeRefreshToken = async (db: Db, account: string) => {
  try {
    const refreshToken = setRefreshToken(account)
    await db.collection('loggedin-user').insertOne({
      account,
      refreshToken
    })
    return refreshToken
  } catch (e) {
    return ''
  }
}
