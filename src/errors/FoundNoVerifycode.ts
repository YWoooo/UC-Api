import CustomError from './prototype'

export default class FoundNoVerifycodeError extends CustomError {
  constructor(params = {
    name: 'FoundNoVerifycodeError',
    status: 400,
  }) {
    super(params)
  }
}