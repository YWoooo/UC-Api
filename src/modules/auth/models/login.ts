// Utils & configs.
import { getCollection } from '@/src/utils/get-collection';
import { setJwtForAuth } from '@/src/utils/set-jwt-for-auth';
import { res401, res500 } from '@/src/configs/common-reses'
// Types.
import { Res } from '@/src/types/res';
import { RegisterParams } from '../types/registerData'

interface ResData {
  token: string;
}

export const login = async ({ email, password }: RegisterParams): Promise<Res<ResData | null>> => {
  try {
    const collection = await getCollection('user')
    const user = await collection.findOne({ email })

    if (user?.password !== password) return res401
    return {
      code: 201,
      data: {
        token: setJwtForAuth(email)
      },
      message: 'Login success.'
    }
  } catch (e) {
    console.log('In login model: ', e)
    return res500
  }
}
