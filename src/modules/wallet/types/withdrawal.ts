import { PayParams } from './pay'

export interface WithdrawalParams extends PayParams {
    mode: WithdrawalMode
}

enum WithdrawalMode {
    bankCard,
    wireTransfer,
    bilypay
}
