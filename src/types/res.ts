export interface ResInterface {
  code: number;
  msg?: string;
}

/**
 * code
 *  1: Request success. All good.
 *  -1: Request fail Don't know why.
 * -20: Wrong format of param.
 * -21: Duplicated.
 * 200001: The thing you want to create, such as a new user account, is already exist.
 */

export interface Res<Data> {
  code: number // Mostly http status code like.
  data: Data // If there's no data to send, please send null.
  message: string
}
