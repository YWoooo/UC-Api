import { PayParams } from './pay'

export interface TransferParams extends PayParams {
}

export enum TransferStatus {
  none,
  success,
  fail,
  reviewing
}
