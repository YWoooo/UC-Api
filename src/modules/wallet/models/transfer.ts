import MissingParamsError from '@/src/errors/MissingParams'
import CustomError from '@/src/errors/prototype'
import { trasnferConfigs } from '../configs/transfer-configs'
// Types.
import { TransferParams } from '../types/transfer'
import { Collection } from 'mongodb';
// Utils & configs.
import { getDb } from '@/src/utils/get-db';
import checkIsAmountInLimit from '../utils/checkIsAmountInLimit'
import { addTransferRecord } from '../utils/add-record'

export const transfer = async (params: TransferParams) => {
  checkParams(params)

  const { fromAccount, toAccount, amount } = params

  const db = await getDb()
  const users = db.collection('user')

  await takeBalance(users, fromAccount, amount)
  await addBalance(users, toAccount, amount)

  addTransferRecord(params, db)
}

const checkParams = (params: TransferParams) => {
  const { fromAccount, toAccount, amount } = params
  const { minAmount, maxAmount } = trasnferConfigs

  const isSameAccount = fromAccount === toAccount
  if (isSameAccount) {
    throw new CustomError({
      name: 'SameAccountError',
      status: 400,
      isPublic: false
    })
  }

  const isParamsMissing = !fromAccount || !toAccount || !amount
  if (isParamsMissing) {
    throw new MissingParamsError()
  }

  checkIsAmountInLimit(amount, minAmount, maxAmount)
}

const takeBalance = async (users: Collection, account: string, amount: number) => {
  const filter = {
    account,
    balance: { $gt: amount }
  }
  const update = {
    $inc: { balance: -amount }
  }
  const res = await users.findOneAndUpdate(filter, update)

  const isUserExist = res.value
  if (!isUserExist) {
    throw new CustomError({
      name: 'FromAccountNotExistError',
      status: 404,
      isPublic: true
    })
  }
}

const addBalance = async (users: Collection, account: string, amount: number) => {
  const filter = { account }
  const update = {
    $inc: { balance: amount }
  }
  const res = await users.findOneAndUpdate(filter, update)

  const isUserExist = res.value
  if (!isUserExist) {
    throw new CustomError({
      name: 'ToAccountNotExistError',
      status: 404,
      isPublic: true
    })
  }
}
