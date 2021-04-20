import { getDb } from '@/src/utils/get-db'
import CustomError from '@/src/errors/prototype'
import MissingParamsError from '@/src/errors/MissingParams'
// Types.
import { VerifyCode } from '../types/VerifyCode'
import { Db } from 'mongodb'

export const postVerifyCode = async ({ receiver, receiverType }: VerifyCode.Params) => {
  checkParams({ receiver, receiverType })
  const db = await getDb()

  await checkIsInCooldown({ receiver, receiverType }, db)
  const verifyCodeData = setVerifyCodeData({ receiver, receiverType })

  db.collection('verifyCode')
    .insertOne(verifyCodeData)
}

const checkParams = (body: any) => {
  const { receiver, receiverType } = body
  const isMissingParams = !receiver || !receiverType
  if (isMissingParams) {
    throw new MissingParamsError
  }

  const isReceiverTypeWrong =
    receiverType !== 'email' && receiverType !== 'phone'
  if (isReceiverTypeWrong) {
    throw new CustomError({
      name: 'WrongReceiverTypeError',
      status: 400
    })
  }
}

const checkIsInCooldown = async (queries: VerifyCode.Params, db: Db) => {
  const verifyCodeRecords = await db
    .collection('verifyCode')
    .find(queries)
    .sort({ createdTime: -1 })
    .toArray()
  const lastRecord = verifyCodeRecords[0]

  if (lastRecord) {
    const isIn60sec = Math.floor(Date.now() / 1000) - lastRecord.createdTime < 60
    if (isIn60sec) {
      throw new CustomError({
        name: 'InCooldownError',
        status: 400,
        isPublic: true
      })
    }
  }
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
