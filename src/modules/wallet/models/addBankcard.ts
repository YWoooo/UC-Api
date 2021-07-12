// Types.
import { Bankcard } from '../types/bankcard'
import { BankCardStatus } from '@/src/types/BankCardStatus'
// Utils.
import sharp from 'sharp'
import { getDb } from '@/src/utils/get-db'
import MissingParamsError from '@/src/errors/MissingParams'
import timestamp from '@/src/utils/formatter/timestamp'

export const addBankcard = async (bankcard: Bankcard.FromClient) => {
  checkParams(bankcard)
  await addRecord(bankcard)
}

const checkParams = (bankcard: Bankcard.FromClient) => {
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

const addRecord = async (bankcard: Bankcard.FromClient) => {
  const db = await getDb()
  const records = db.collection(`bankcards`)
  const record = await setBankcardToDb(bankcard)
  records.insertOne(record)
}

const setBankcardToDb = async (
  bankcard: Bankcard.FromClient
): Promise<Bankcard.InDb> => {
  return {
    ...bankcard,
    imgs: await Promise.all(
      bankcard.imgs.map(async img => await sharpAndToStr(img))
    ),
    createdTime: timestamp(),
    status: BankCardStatus.reviewing,
  }
}

const sharpAndToStr = async (img: Express.Multer.File) => {
  const buffer = await sharp(img.buffer).resize(300, null).png().toBuffer()
  return buffer.toString('base64')
}
