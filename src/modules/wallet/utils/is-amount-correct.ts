export const isAmountCorrect = (fromAmount: number, toAmount: number, rate: number) =>
  fromAmount * rate === toAmount