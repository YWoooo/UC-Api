// Configs.
import { withdrawalConfigs } from '../configs/withdrawal-configs'
import { trasnferConfigs } from '../configs/transfer-configs'
// Types.
import { WithdrawalParams } from '../types/withdrawal'
import { TransferParams } from '../types/transfer'

export const checkWithdrawalParams = (params: WithdrawalParams) => {
  checkIsInOfficeHour()
  checkIsParamsMissing(params)

  const { fromAmount, toAmount, rate: clientRate } = params
  const { rate: serverRate, minAmount, maxAmount } = withdrawalConfigs

  checkIsAmountInLimit(fromAmount, minAmount, maxAmount)
  checkIsRateCorrect(clientRate, serverRate)
  checkIsAmountCorrect(fromAmount, toAmount)
}

export const checkTransferParams = (params: TransferParams) => {
  const { amount } = params
  if (!amount) {
    throw new Error('Missing params.')
  }

  const { minAmount, maxAmount } = trasnferConfigs
  checkIsAmountInLimit(amount, minAmount, maxAmount)
}
