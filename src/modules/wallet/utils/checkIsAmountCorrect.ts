import CustomError from '@/src/errors/prototype'

export default (
  fromAmount: number,
  toAmount: number
) => {
  const serverRate = 1
  const wrongAmount = fromAmount * serverRate !== toAmount

  if (wrongAmount) {
    throw new CustomError({
      name: 'WrongAmountError',
      status: 400,
    })
  }
}