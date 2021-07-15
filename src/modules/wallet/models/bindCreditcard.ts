// Utils.
import CustomError from '@/src/errors/prototype'
import MissingParamsError from '@/src/errors/MissingParams'
import { getDb } from '@/src/utils/get-db'
import timestamp from '@/src/utils/formatter/timestamp'
// Types.
import { Request, Response } from 'express'
import { Db } from 'mongodb'

export const bindCreditcard = async (req: Request, res: Response) => {
  checkParams(req)
  const db = await getDb()

  // TODO: make it atomic.
  // I'm using old MongoDB and I don't even have Mongoose. I really regret this.
  await checkIsCardNoExist(req.body.cardNo, db)
  await addRecord(req, res, db)
}

const checkParams = (req: Request) => {
  const { cardNo, expDate, securityCode } = req.body
  const regs = {
    cardNo: /^\d{14,16}$/g, // 14-16 digits number
    expDate: /^(0[1-9]|1[0-2])\/\d\d$/g, // mm/yy
    securityCode: /^\d{3}$/g, // 3 digits number
  }

  const isParamMissing = !cardNo || !expDate || !securityCode
  if (isParamMissing) {
    throw new MissingParamsError()
  }

  const isCardNo = regs.cardNo.test(cardNo)
  if (!isCardNo) {
    throw new CustomError({
      name: 'WrongCardNoError',
      status: 400,
      message: 'CardNo should be 14-16 digits number string.',
    })
  }

  const isExpDate = regs.expDate.test(expDate)
  if (!isExpDate) {
    throw new CustomError({
      name: 'WrongExpDateError',
      status: 400,
      message: 'ExpDate should be mm/yy string.',
    })
  }

  const isSecurityCode = regs.securityCode.test(securityCode)
  if (!isSecurityCode) {
    throw new CustomError({
      name: 'WrongSecurityCodeError',
      status: 400,
      message: 'SecurityCode should be 3 digits number string.',
    })
  }
}

const checkIsCardNoExist = async (cardNo: string, db: Db) => {
  const oldRecord = await db.collection('creditcard').findOne({ cardNo })
  if (oldRecord) {
    throw new CustomError({
      name: 'CardNoExistError',
      status: 400,
      isPublic: true,
    })
  }
}

const addRecord = async (req: Request, res: Response, db: Db) => {
  const account = res.locals.account
  const record = {
    account,
    ...req.body,
    createdTime: timestamp(),
  }
  await db.collection('creditcard').insertOne(record)
}
