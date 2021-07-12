import MissingParamsError from '@/src/errors/MissingParams'
import UserNotExistError from '@/src/errors/UserNotExist'
import { withdrawalConfigs } from '../configs/withdrawal-configs'
// Types.
import { Db } from 'mongodb'
import { WithdrawalParams } from '../types/withdrawal'
// Utils.
import { getDb } from '@/src/utils/get-db'
import checkVerifyCode from '@/src/utils/check-verifycode'
import checkIsAmountInLimit from '../utils/checkIsAmountInLimit'
import checkIsRateCorrect from '../utils/checkIsRateCorrect'
import checkIsAmountCorrect from '../utils/checkIsAmountCorrect'
import { addWithdrawalRecord } from '../utils/add-record'

export const withdrawal = async (params: WithdrawalParams) => {
  const { receiver, receiverType, code } = params.verifycode
  await checkVerifyCode(receiver, receiverType, code)
  checkParams(params)
  const db = await getDb()

  await updateBalance(params, db)
  addWithdrawalRecord(params, db)
}

const checkParams = (params: WithdrawalParams) => {
  const { account, fromAmount, toAmount, rate: clientRate } = params

  const isParamsMissing = !account || !fromAmount || !toAmount || !clientRate
  if (isParamsMissing) {
    throw new MissingParamsError()
  }

  const { rate: serverRate, minAmount, maxAmount } = withdrawalConfigs

  checkIsAmountInLimit(fromAmount, minAmount, maxAmount)
  checkIsRateCorrect(clientRate, serverRate)
  checkIsAmountCorrect(fromAmount, toAmount)
}

const updateBalance = async (params: WithdrawalParams, db: Db) => {
  const { account, fromAmount } = params
  const filter = {
    account,
    balance: { $gt: fromAmount },
  }
  const update = {
    $inc: { balance: -fromAmount },
  }

  const res = await db.collection('user').findOneAndUpdate(filter, update)

  const isUserExist = res.value
  if (!isUserExist) {
    throw new UserNotExistError()
  }
}
