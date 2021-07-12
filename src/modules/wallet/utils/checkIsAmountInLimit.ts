import CustomError from '@/src/errors/prototype'

export default (fromAmount: number, minAmount: number, maxAmount: number) => {
  if (fromAmount < minAmount) {
    throw new CustomError({
      name: 'UnderMinAmountError',
      status: 400,
    })
  }
  if (fromAmount > maxAmount) {
    throw new CustomError({
      name: 'OverMaxAmountError',
      status: 400,
    })
  }
}
