import { PayParams } from './pay'

export interface WithdrawalParams extends PayParams {
  mode: WithdrawalMode
  verifycode: {
    code: string
    receiver: string
    receiverType: 'email' | 'phone'
  }
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
