// Utils & configs.
import { getDb } from '@/src/utils/get-db'
import { setAccessToken, setRefreshToken } from '@/src/utils/set-jwt-for-auth'
import { hash } from '@/src/utils/pwd-helper'
import checkVerifyCode from '@/src/utils/check-verifycode'
// Types.
import { Db } from 'mongodb'
import { RegisterParams } from '../types/registerData'
import User from '@/src/types/user'

export const register = async ({
  email,
  verifycode,
  password,
}: RegisterParams) => {
  const db = await getDb()
  await checkIsEmailExist(db, email)
  await checkVerifyCode(email, 'email', verifycode)
  await createUser(db, email, password)
  const tokens = setTokens(email)

  return {
    code: 201,
    data: tokens,
    message: 'ok',
  }
}

const checkIsEmailExist = async (db: Db, email: string) => {
  const userWithSameEmail = await db.collection('user').findOne({ email })
  if (userWithSameEmail) {
    throw new Error('Email exist.')
  }
}

const createUser = async (db: Db, email: string, pwd: string) => {
  const hashedPwd = await hash(pwd)
  const numOfUsers = await db.collection('user').countDocuments()
  const account = 'N' + `${numOfUsers + 1}`.padStart(6, '0')
  const user = new User(email, hashedPwd, account)
  await db.collection('user').insertOne(user)
}

const setTokens = (email: string) => {
  return {
    accessToken: setAccessToken(email),
    refreshToken: setRefreshToken(email),
  }
}
