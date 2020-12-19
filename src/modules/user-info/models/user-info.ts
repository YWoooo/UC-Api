import { Res } from '@/src/types/res';
import { getDb } from '@/src/utils/get-db';
import User from '@/src/types/user'

export const getUserInfo = async (account: string): Promise<Res<User>> => {
  try {
    const db = await getDb()
    const user = await db.collection('user').findOne({ account })
    return {
      code: user ? 200 : 404,
      data: user
    }
  }
  catch (e) {
    console.log('In getUserInfo model: ', e)
    return { code: 500 }
  }
}
