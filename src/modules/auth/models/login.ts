import { getDb } from '@/src/utils/get-db'
import { setAccessToken, setRefreshToken } from '@/src/utils/set-jwt-for-auth';
import { RegisterParams } from '../types/registerData'
import { Db } from 'mongodb';

export const login = async ({ email, password }: RegisterParams) => {
  const db = await getDb()
  const user = await db.collection('user').findOne({ email })

  if (!user) {
    throw new Error('User not exist.')
  }
  if (user?.password !== password) {
    throw new Error('Wrong password.')
  }

  const headers = {
    accessToken: setAccessToken(user.account),
    refreshToken: await storeRefreshToken(db, user.account)
  }
  return {
    headers
  }
}

const storeRefreshToken = async (db: Db, account: string) => {
  const refreshToken = setRefreshToken(account)
  const query = { account }
  const update = { $set: { refreshToken } }
  const options = { upsert: true }
  await db.collection('loggedin-user').findOneAndUpdate(
    query,
    update,
    options
  )
  return refreshToken
}
