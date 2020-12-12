import { WithdrawalParams } from '../types/withdrawal';
import { getDb } from '@/src/utils/get-db';
import { checkWithdrawalParams } from '../utils/check-params';

export const withdrawal = async (params: WithdrawalParams): Promise<number> => {
  let code = 0
  code = checkWithdrawalParams(params)
  if (code) return code

  const { account, fromAmount } = params
  const filter = {
    account,
    balance: { $gt: fromAmount }
  }
  const update = {
    $inc: { balance: -fromAmount }
  }

  try {
    const db = await getDb()
    const res = await db.collection('user').findOneAndUpdate(filter, update)
    return res.value ? 201 : 400
  } catch (e) {
    console.log('In withdrawal model: ', e)
    return 500
  }
}
