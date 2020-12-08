export const isAmountInLimit = (amount: number, minAmount: number, maxAmount: number) =>
  amount >= minAmount && amount <= maxAmount