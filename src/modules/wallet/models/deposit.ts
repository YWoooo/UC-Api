// Utils & configs.
import { getDb } from '@/src/utils/get-db';
import { res400, res500 } from '@/src/configs/common-reses'
import some from 'lodash.some'
import isNil from 'lodash.isnil'
// Types.
import { Db } from 'mongodb';
import { Res } from '@/src/types/res';
import { DepositParams, DepositRecord, DepositStatus } from '../types/deposit';

export const deposit = async (params: DepositParams): Promise<Res<null>> => {
  try {
    const db = await getDb()
    await addBalance(params.account, +params.toAmount, db)
    await addRecord(params, db)
    return {
      code: 200,
      data: null,
      message: 'Deposit success.'
    }
  } catch (e) {
    console.log('In deposit model: ', e)
    if (e.message === '400') return res400
    return res500
  }
}

const addBalance = async (account: string, amount: number, db: Db) => {
  if (!account || !amount) throw new Error('400')
  await db.collection('user').findOneAndUpdate(
    { account },
    { $inc: { balance: amount } }
  )
}

const addRecord = async (params: DepositParams, db: Db) => {
  if (some(params, isNil)) throw new Error('400')
  const records = db.collection(`deposit-record.${params.account}`)
  const record: DepositRecord = {
    ...params,
    createdTime: Math.floor(Date.now() / 1000),
    status: DepositStatus.reviewing
  }
  records.insertOne(record)
}
