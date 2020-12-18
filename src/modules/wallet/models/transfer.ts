import { Res } from '@/src/types/res';
import { getDb } from '@/src/utils/get-db';
import { TransferParams } from '../types/transfer'

export const transfer = async (params: TransferParams): Promise<Res> => {
  try {
    const db = await getDb()
    return { code: 201 }
  }
  catch (e) {
    console.log('In transfer model: ', e)
    return { code: 500 }
  }
}
