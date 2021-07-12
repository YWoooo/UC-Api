import { getDb } from '@/src/utils/get-db'
import { VerifyCode } from '@/src/modules/auth/types/VerifyCode'
// Errors.
import FoundNoVerifycodeError from '@/src/errors/FoundNoVerifycode'
import VerifycodeExpireError from '@/src/errors/VerifycodeExpire'
import WrongVerifycodeError from '@/src/errors/WrongVerifycode'

export default async (
  receiver: string,
  receiverType: VerifyCode.ReceiverType,
  code: string
): Promise<void> => {
  const db = await getDb()
  const queries = {
    receiver,
    receiverType,
  }
  const latestVerifyCode: VerifyCode.Entity | null = await db
    .collection('verifyCode')
    .findOne(queries, { sort: { $natural: -1 } })

  if (!latestVerifyCode) {
    throw new FoundNoVerifycodeError()
  }
  if (code !== latestVerifyCode.code) {
    throw new WrongVerifycodeError()
  }
  if (isExpire(latestVerifyCode.expire)) {
    throw new VerifycodeExpireError()
  }
}

const isExpire = (expire: number) => {
  const now = Math.floor(Date.now() / 1000)
  return now > expire
}
