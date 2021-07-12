import CustomError from './prototype'

export default class MissingParamsError extends CustomError {
  constructor(
    params = {
      name: 'MissingParamsError',
      status: 400,
    }
  ) {
    super(params)
  }
}
