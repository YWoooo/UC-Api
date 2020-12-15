import { Db } from 'mongodb'
import { DepositParams, DepositRecord, DepositStatus } from '../types/deposit';
import { WithdrawalParams, WithdrawalRecord, WithdrawalStatus } from '../types/withdrawal';

export const addDepositRecord = async (params: DepositParams, db: Db) => {
  const records = db.collection(`withdrawal-record`)
  const record: DepositRecord = {
    ...params,
    createdTime: setTimeStamp(),
    status: DepositStatus.reviewing
  }
  records.insertOne(record)
}

export const addWithdrawalRecord = async (params: WithdrawalParams, db: Db) => {
  const records = db.collection(`withdrawal-record`)
  const record: WithdrawalRecord = {
    ...params,
    createdTime: setTimeStamp(),
    status: WithdrawalStatus.reviewing
  }
  records.insertOne(record)
}

const setTimeStamp = () => Math.floor(Date.now() / 1000)