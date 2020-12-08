// Some common response.
import { Res } from '../types/res';

export const res200: Res<null> = {
  code: 200,
  data: null,
  message: 'Success.'
}

export const res400: Res<null> = {
  code: 400,
  data: null,
  message: 'Some param(s) is missing or incorrect, please check again.'
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
