import CustomError from '@/src/errors/prototype'

export default (clientRate: number, serverRate: number) => {
  if (clientRate !== serverRate) {
    throw new CustomError({
      name: 'WrongRateError',
      status: 400,
    })
  }
}
