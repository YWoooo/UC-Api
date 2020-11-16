// Some common response.
import { Res } from '../types/res';

export const res200: Res<null> = {
  code: 200,
  data: null,
  message: 'Success.'
}

export const res401: Res<null> = {
  code: 401,
  data: null,
  message: 'Unauthorized, please login or register to get the authorization.'
}

export const res500: Res<null> = {
  code: 500,
  data: null,
  message: 'Unexpected error, please contact us.'
}
