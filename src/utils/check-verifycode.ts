import { getDb } from '@/src/utils/get-db'
import { VerifyCode } from '@/src/modules/auth/types/VerifyCode'

export default async (receiver: string, receiverType: VerifyCode.ReceiverType, code: string): Promise<void> => {

  const db = await getDb()
  const queries = {
    receiver,
    receiverType
  }
  const latestVerifyCode: VerifyCode.Entity | null =
    await db.collection('verifyCode')
      .findOne(queries, { sort: { $natural: -1 } })

  if (!latestVerifyCode) {
    throw new Error('Find no verify code.')
  }
  if (isExpire(latestVerifyCode.expire)) {
    throw new Error('Verify code expire.')
  }
  if (code !== latestVerifyCode.code) {
    throw new Error('Wrong verify code.')
  }
}

const isExpire = (expire: number) => {
  const now = Math.floor(Date.now() / 1000)
  return now > expire
}
