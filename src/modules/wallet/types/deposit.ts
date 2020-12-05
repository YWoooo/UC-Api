export interface DepositParams {
    account: string;
    fromAmount: number;
    fromCcy: string;
    toAmount: number;
    toCcy: string;
    rate: number;
    channel: DepositChannel;
}

enum DepositChannel {
    bankCard,
    wireTransfer,
    bilypay
}
