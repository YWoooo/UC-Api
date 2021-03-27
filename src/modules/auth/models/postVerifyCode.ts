import { getDb } from '@/src/utils/get-db'
// Types.
import { VerifyCode } from '../types/VerifyCode'
import { Db } from 'mongodb'

export const postVerifyCode = async ({ receiver, receiverType }: VerifyCode.Params) => {
  const db = await getDb()
  const isInCooldown = await checkIsInCooldown({ receiver, receiverType }, db)
  if (isInCooldown) {
    throw new Error('It\'s in cooldown.')
  }

  const verifyCodeData = setVerifyCodeData({ receiver, receiverType })
  db.collection('verifyCode').insertOne(verifyCodeData)
}

const checkIsInCooldown = async (queries: VerifyCode.Params, db: Db): Promise<boolean> => {
  const verifyCodeRecords = await db
    .collection('verifyCode')
    .find(queries)
    .sort({ createdTime: -1 })
    .toArray()
  const lastRecord = verifyCodeRecords[0]
  if (!lastRecord) return false
  return Math.floor(Date.now() / 1000) - lastRecord.createdTime < 60
}

const setVerifyCodeData = ({ receiver, receiverType }: VerifyCode.Params) => {
  const createdTime = Math.floor(Date.now() / 1000)
  return {
    receiver,
    receiverType,
    code: (Math.floor(100000 + Math.random() * 900000)) + '',
    createdTime,
    expire: createdTime + 600
  }
}
