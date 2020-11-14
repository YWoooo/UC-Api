// Some common response.
import { Res } from '../types/res';

export const res500: Res<null> = {
  code: 500,
  data: null,
  message: 'Unexpected error, please contact us.'
}
