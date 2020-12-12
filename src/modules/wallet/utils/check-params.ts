import { errorCode } from '@/src/configs/errorCode'
import { withdrawalConfigs } from '../configs/withdrawal-configs'
import { WithdrawalParams } from '../types/withdrawal'
import some from 'lodash.some'
import isNil from 'lodash.isnil'

export const checkWithdrawalParams = (params: WithdrawalParams) => {
  if (!isInOfficeHour()) return errorCode.notOfficeHour
  if (some(params, isNil)) return errorCode.missingParams

  const { fromAmount, toAmount, rate: clientRate } = params
  const { rate: serverRate, minAmount, maxAmount } = withdrawalConfigs

  if (!isAmountInLimit(fromAmount, minAmount, maxAmount))
    return errorCode.overOrUnderLimit

  if (!isRateCorrect(clientRate, serverRate))
    return errorCode.incorrectRate

  if (!isAmountCorrect(fromAmount, toAmount))
    return errorCode.incorrectAmount
  return 0
}

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