import MissingParamsError from '@/src/errors/MissingParams'
import UserNotExistError from '@/src/errors/UserNotExist'
import { DepositConfigs } from '../configs/depositConfigs'
// Types.
import { Db } from 'mongodb';
import { DepositParams } from '../types/deposit';
// Utils.
import { getDb } from '@/src/utils/get-db';
import checkIsAmountInLimit from '../utils/checkIsAmountInLimit'
import checkIsRateCorrect from '../utils/checkIsRateCorrect'
import checkIsAmountCorrect from '../utils/checkIsAmountCorrect'
import { addDepositRecord } from '../utils/add-record'

export const deposit = async (params: DepositParams) => {
  checkParams(params)
  const db = await getDb()

  await updateBalance(params, db)
  addDepositRecord(params, db)
}

const checkParams = (params: DepositParams) => {
  const {
    account,
    fromAmount,
    toAmount,
    rate: clientRate
  } = params
  const isParamsMissing = !account || !fromAmount || !toAmount || !clientRate
  if (isParamsMissing) {
    throw new MissingParamsError()
  }

  const {
    rate: serverRate,
    minAmount,
    maxAmount
  } = DepositConfigs

  checkIsAmountInLimit(fromAmount, minAmount, maxAmount)
  checkIsRateCorrect(clientRate, serverRate)
  checkIsAmountCorrect(fromAmount, toAmount)
}

const updateBalance = async (params: DepositParams, db: Db) => {
  const { account, toAmount: amount } = params
  const filter = { account }
  const update = { $inc: { balance: amount } }

  const res = await db
    .collection('user')
    .findOneAndUpdate(filter, update)

  const isUserExist = res.value
  if (!isUserExist) {
    throw new UserNotExistError()
  }
}
