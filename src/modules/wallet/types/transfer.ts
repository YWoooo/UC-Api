export interface TransferParams {
  fromAccount: string;
  toAccount: string;
  amount: number;
  ccy: string;
}

export enum TransferStatus {
  none,
  success,
  fail,
  reviewing
}
