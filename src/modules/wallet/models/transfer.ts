// Types.
import { Res } from '@/src/types/res';
import { TransferParams } from '../types/transfer'
import { Collection } from 'mongodb';
// Utils & configs.
import { getDb } from '@/src/utils/get-db';
import { checkTransferParams } from '../utils/check-params';
import { resCode } from '@/src/configs/resCode'

export const transfer = async (params: TransferParams): Promise<Res> => {
  let code = 0
  code = checkTransferParams(params)
  if (code) return { code }

  const { fromAccount, toAccount, amount } = params
  if (!fromAccount || !toAccount) return { code: 400000 }

  try {
    const db = await getDb()
    const users = db.collection('user')

    const res = await Promise.all([
      takeMoney(users, fromAccount, amount),
      addMoney(users, toAccount, amount)
    ])
    code = res[0] || res[1]
    return { code }
  }
  catch (e) {
    console.log('In transfer model: ', e)
    return { code: 500 }
  }
}

const takeMoney = async (users: Collection, account: string, amount: number): Promise<number> => {
  const filter = {
    account,
    balance: { $gt: amount }
  }
  const update = {
    $inc: { balance: -amount }
  }
  const res = await users.findOneAndUpdate(filter, update)
  return res.value ? 0 : 400
}
const addMoney = async (users: Collection, account: string, amount: number): Promise<number> => {
  const filter = { account }
  const update = {
    $inc: { balance: amount }
  }
  const res = await users.findOneAndUpdate(filter, update)
  return res.value ? 201 : resCode.notExistUser
}
