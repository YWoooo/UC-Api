export interface DepositParams {
    account: string;
    fromAmount: number;
    fromCcy: string;
    toAmount: number;
    toCcy: string;
    rate: number;
    channel: DepositChannel;
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
