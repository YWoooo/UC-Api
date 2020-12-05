import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient
const url = process.env.ATLAS_URL as string

export const getDb = async (dbName = 'uc') =>
  (await MongoClient.connect(url)).db(dbName)