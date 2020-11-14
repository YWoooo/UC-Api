// import mongodb from 'mongodb'
// import { v4 as uuidv4 } from 'uuid';
// import { IRegisterData } from '../types/registerData'
// const
//     MongoClient = mongodb.MongoClient,
//     url = process.env.ATLAS_URL

// export const register = async (registerData: IRegisterData) => {
//     try {
//         const
//             db = (await MongoClient.connect(url as string)).db('uc'),
//             collection = db.collection("user"),
//             isEmailExist = await collection.findOne({ email: registerData.email })
//         if (isEmailExist) return -21
//         const sessionId = uuidv4()
//         await collection.insertOne({ ...registerData, sessionId })
//         return { code: 1, sessionId }
//     } catch (e) {
//         console.log('register() in registerModels.ts: ', e)
//         return -1
//     }
// }

