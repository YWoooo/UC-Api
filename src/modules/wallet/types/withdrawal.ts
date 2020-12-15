import { PayParams } from './pay'

export interface WithdrawalParams extends PayParams {
  mode: WithdrawalMode
}
export enum WithdrawalMode {
  bankCard,
  wireTransfer,
  bilypay
}
export interface WithdrawalRecord extends WithdrawalParams {
  status: WithdrawalStatus
  createdTime: number
}
export enum WithdrawalStatus {
  none,
  success,
  fail,
  reviewing
}
