// Types.
import { Bankcard } from '../types/bankcard';
import { BankCardStatus } from '@/src/types/BankCardStatus';
// Utils.
import { getDb } from '@/src/utils/get-db';
import MissingParamsError from '@/src/errors/MissingParams'
import timestamp from '@/src/utils/formatter/timestamp'

export const addBankcard = async (bankcard: Bankcard) => {
  checkParams(bankcard)
  await addRecord(bankcard)
}

const checkParams = (bankcard: Bankcard) => {
  const {
    account,
    bankAccountNo,
    holder,
    bankName,
    branchName,
    bankAddress,
    ccy,
    swiftcode,
    imgs,
  } = bankcard
  if (
    !account ||
    !bankAccountNo ||
    !holder ||
    !bankName ||
    !branchName ||
    !bankAddress ||
    !ccy ||
    !swiftcode ||
    !imgs
  ) {
    throw new MissingParamsError()
  }
}

const addRecord = async (bankcard: Bankcard) => {
  const db = await getDb()
  const records = db.collection(`bankcards`)
  const record = {
    ...bankcard,
    createdTime: timestamp(),
    status: BankCardStatus.reviewing
  }
  records.insertOne(record)
}
