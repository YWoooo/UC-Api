import { PayParams } from './pay'
export interface DepositParams extends PayParams {
  channel: DepositChannel;
}
export interface DepositResData {
  url: string;
}

export interface DepositRecord extends DepositParams {
  status: DepositStatus
  createdTime: number
}

enum DepositChannel {
  bankCard,
  wireTransfer,
  bilypay
}

export enum DepositStatus {
  none,
  success,
  fail,
  reviewing
}
