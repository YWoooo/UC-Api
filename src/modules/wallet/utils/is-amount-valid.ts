export const isAmountValid = (fromAmount: number, toAmount: number, clientRate: number) => {
  const serverRate = 1; // TODO.
  return isRateCorrect(serverRate, clientRate) &&
    isAmountCorrect(fromAmount, toAmount, serverRate)
}

const isRateCorrect = (serverRate: number, clientRate: number) =>
  serverRate === clientRate

const isAmountCorrect = (fromAmount: number, toAmount: number, serverRate: number) =>
  fromAmount * serverRate === toAmount