import CustomError from './prototype'

export default class VerifycodeExpireError extends CustomError {
  constructor(params = {
    name: 'VerifycodeExpireError',
    status: 400,
  }) {
    super(params)
  }
}