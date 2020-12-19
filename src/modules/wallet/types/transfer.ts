export interface TransferParams {
  fromAccount: string;
  toAccount: string;
  amount: number;
  ccy: string;
}

export interface TransferlRecord extends TransferParams {
  status: TransferStatus
  createdTime: number
}

export enum TransferStatus {
  none,
  success,
  fail,
  reviewing
}
