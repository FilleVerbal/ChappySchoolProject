import { Collection, Db, MongoClient } from "mongodb"
import { UserProfile, Message, Channel } from "../data/datastructures.js"

const con: string | undefined = process.env.CONNECTION_STRING
let db: Db | null = null
let client : MongoClient | null = null

async function getDb() {
    if (!con) {
        throw new Error('No connection string')
    }
    client = new MongoClient(con)
    await client.connect()
    db = client.db('Chappy')
}

function getUserCollection(): Collection<UserProfile> {
    if (!db) {
        throw new Error('Database Not Initialized')
    }
    return db.collection<UserProfile>('users')
}

function getMessageCollection(): Collection<Message> {
    if (!db) {
        throw new Error('Database Not Initialized')
    }
    return db.collection<Message>('messages')
}

function getChannelCollection(): Collection<Channel> {
    if (!db) {
        throw new Error('Database Not Initialized')
    }
    return db.collection<Channel>('channels')
}

//  close client in case i might need it later or not, doesnt hurt to have it and not need it
async function closeClient() {
    if(client) {
        try {
            await client.close()
            client = null
            db = null
        } catch (error) {
            console.error('Error closing mongodb client', error)
        }
    }
}

export { getDb, getUserCollection, getMessageCollection, getChannelCollection, closeClient }