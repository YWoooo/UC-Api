import CustomError from './prototype'

export default class WrongVerifycodeError extends CustomError {
  constructor(params = {
    name: 'WrongVerifycodeError',
    status: 400,
    isPublic: true
  }) {
    super(params)
  }
}