import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient
const url = process.env.ATLAS_URL as string

export const getCollection = async (collectionName: string, dbName = 'uc') => {
    return (await MongoClient.connect(url))
        .db(dbName)
        .collection(collectionName)
}