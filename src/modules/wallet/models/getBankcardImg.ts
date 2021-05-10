import { getDb } from '@/src/utils/get-db';

export const getBankcardImg = async (account: string) => {
  const db = await getDb()
  const bankcard =
    await db.collection('bankcards').findOne(
      { account },
      { sort: { $natural: -1 } }
    )
  return bankcard
    ? Buffer.from(bankcard?.imgs[0], 'base64')
    : ''
}
