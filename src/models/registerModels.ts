import mongodb from 'mongodb'
import { RegisterDataInterface } from '../interfaces/registerData'
const
    MongoClient = mongodb.MongoClient,
    url = process.env.ATLAS_URL

export const register = async (registerData: RegisterDataInterface) => {
    try {
        const
            db = (await MongoClient.connect(url as string)).db('uc'),
            collection = db.collection("user")
        await collection.insertOne(registerData)
        return 1
    } catch (e) {
        console.log(e)
        return -1
    }
}

