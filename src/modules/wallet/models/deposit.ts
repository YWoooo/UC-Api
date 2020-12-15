import { Res } from '@/src/types/res';
import { DepositParams, DepositResData, DepositRecord, DepositStatus } from '../types/deposit';
import { getDb } from '@/src/utils/get-db';
import { checkDepositParams } from '../utils/check-params'
import { addDepositRecord } from '../utils/add-record'

export const deposit = async (params: DepositParams): Promise<Res<DepositResData>> => {
  let code = 0
  code = checkDepositParams(params)
  if (code) return { code }

  const { account, toAmount: amount } = params
  const filter = { account }
  const update = { $inc: { balance: amount } }

  try {
    const db = await getDb()
    const res = await db.collection('user').findOneAndUpdate(filter, update)
    addDepositRecord(params, db)
    code = res.value ? 201 : 400

    return {
      code,
      data: { url: 'www.google.com' }, // Just for testing.
    }
  }
  catch (e) {
    console.log('In deposit model: ', e)
    return { code: 500 }
  }
}
