import { Db } from 'mongodb'
import { DepositParams, DepositRecord, DepositStatus } from '../types/deposit';
import { WithdrawalParams, WithdrawalRecord, WithdrawalStatus } from '../types/withdrawal';
import { TransferParams, TransferlRecord, TransferStatus } from '../types/transfer'

export const addDepositRecord = async (params: DepositParams, db: Db) => {
  const records = db.collection(`deposit-record`)
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

export const addTransferRecord = async (params: TransferParams, db: Db) => {
  const records = db.collection(`transfer-record`)
  const record: TransferlRecord = {
    ...params,
    createdTime: setTimeStamp(),
    status: TransferStatus.reviewing
  }
  records.insertOne(record)
}

const setTimeStamp = () => Math.floor(Date.now() / 1000)