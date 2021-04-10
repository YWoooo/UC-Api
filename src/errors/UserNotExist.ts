import CustomError from './prototype'

export default class UserNotExistError extends CustomError {
  constructor(params = {
    name: 'UserNotExistError',
    status: 400,
  }) {
    super(params)
  }
}