// Configs.
import { resCode } from '@/src/configs/resCode'
import { DepositConfigs } from '../configs/depositConfigs'
import { withdrawalConfigs } from '../configs/withdrawal-configs'
import { trasnferConfigs } from '../configs/transfer-configs'
// Types.
import { DepositParams } from '../types/deposit'
import { WithdrawalParams } from '../types/withdrawal'
import { TransferParams } from '../types/transfer'
// Utils.
import some from 'lodash.some'
import isNil from 'lodash.isnil'

export const checkDepositParams = (params: DepositParams): number => {
  if (isParamMissing(params)) return resCode.missingParams

  const { fromAmount, toAmount, rate: clientRate } = params
  const { rate: serverRate, minAmount, maxAmount } = DepositConfigs

  if (!isAmountInLimit(fromAmount, minAmount, maxAmount))
    return resCode.overOrUnderLimit

  if (!isRateCorrect(clientRate, serverRate))
    return resCode.incorrectRate

  if (!isAmountCorrect(fromAmount, toAmount))
    return resCode.incorrectAmount

  return 0
}

export const checkWithdrawalParams = (params: WithdrawalParams): number => {
  if (!isInOfficeHour()) return resCode.notOfficeHour
  if (isParamMissing(params)) return resCode.missingParams

  const { fromAmount, toAmount, rate: clientRate } = params
  const { rate: serverRate, minAmount, maxAmount } = withdrawalConfigs

  if (!isAmountInLimit(fromAmount, minAmount, maxAmount))
    return resCode.overOrUnderLimit

  if (!isRateCorrect(clientRate, serverRate))
    return resCode.incorrectRate

  if (!isAmountCorrect(fromAmount, toAmount))
    return resCode.incorrectAmount

  return 0
}

export const checkTransferParams = (params: TransferParams): number => {
  const { amount } = params
  if (!amount) return 400000

  const { minAmount, maxAmount } = trasnferConfigs
  if (!isAmountInLimit(amount, minAmount, maxAmount))
    return resCode.overOrUnderLimit

  return 0
}

const isParamMissing = (params: any) => some(params, isNil)

const isInOfficeHour = () => {
  const hour = new Date().getHours()
  return hour > withdrawalConfigs.officeHours[0] - 1 && hour < withdrawalConfigs.officeHours[1] - 1
}

const isAmountInLimit = (fromAmount: number, minAmount: number, maxAmount: number) =>
  fromAmount >= minAmount && fromAmount <= maxAmount

const isRateCorrect = (clientRate: number, serverRate: number) => {
  return clientRate === serverRate
}

const isAmountCorrect = (fromAmount: number, toAmount: number) => {
  const serverRate = 1
  return fromAmount * serverRate === toAmount
}