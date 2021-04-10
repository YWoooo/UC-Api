import CustomError from './prototype'

export default class UserNotExistError extends CustomError {
  constructor(params = {
    name: 'UserNotExistError',
    status: 404,
  }) {
    super(params)
  }
}