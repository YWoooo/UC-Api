import { Db } from 'mongodb'
import timestamp from '@/src/utils/formatter/timestamp'
import { DepositParams, DepositRecord, DepositStatus } from '../types/deposit';
import { WithdrawalParams, WithdrawalRecord, WithdrawalStatus } from '../types/withdrawal';
import { TransferParams, TransferlRecord, TransferStatus } from '../types/transfer'

export const addDepositRecord = async (params: DepositParams, db: Db) => {
  const records = db.collection(`deposit-record`)
  const record: DepositRecord = {
    ...params,
    createdTime: timestamp(),
    status: DepositStatus.reviewing
  }
  records.insertOne(record)
}

export const addWithdrawalRecord = async (params: WithdrawalParams, db: Db) => {
  const records = db.collection(`withdrawal-record`)
  const record: WithdrawalRecord = {
    ...params,
    createdTime: timestamp(),
    status: WithdrawalStatus.reviewing
  }
  records.insertOne(record)
}

export const addTransferRecord = async (params: TransferParams, db: Db) => {
  const records = db.collection(`transfer-record`)
  const record: TransferlRecord = {
    ...params,
    createdTime: timestamp(),
    status: TransferStatus.reviewing
  }
  records.insertOne(record)
}
