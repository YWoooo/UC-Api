/**
 * @description customized error object.
 * @param {ErrorParams} params
 */
export default class CustomError extends Error {
  public name: string
  public status: number
  public message: string
  public isPublic: boolean

  constructor(params: ErrorParams) {
    super(params.message);
    // See https://stackoverflow.com/questions/42064466/instanceof-using-es6-class-inheritance-chain-doesnt-work
    Object.setPrototypeOf(this, CustomError.prototype);

    this.name = params.name
    this.status = params.status
    this.message = params.message || ''
    this.isPublic = params.isPublic || false
  }
}
interface ErrorParams {
  name: string
  status: number
  message?: string
  isPublic?: boolean // Default false.
}