import { WithId, InsertOneResult, UpdateResult, ObjectId, DeleteResult } from "mongodb"
import { Message } from "../data/datastructures.js"
import { getMessageCollection } from "../database/getdb.js"

async function getAllMessages(): Promise<WithId<Message>[]> {
    const col = getMessageCollection()
    try {
        const result: WithId<Message>[] = await col.find({}).toArray()
        return result
    } catch (error) {
        throw new Error('Could not get memessagecollection')
    }
}

async function postNewMessage(newMessage: Message): Promise<InsertOneResult<Message>> {
    const col = getMessageCollection()
    try {
        const result: InsertOneResult<Message> = await col.insertOne(newMessage)
        return result
    } catch (error) {
        throw new Error('Could not add message to collection')
    }
}

async function editMessage(id: string, updatedMessage: Partial<Message>) {
    const col = getMessageCollection()
    let objectId: ObjectId
    try {
        objectId = new ObjectId(id)
    } catch (error) {
        throw new Error('Invalid id')
    }
    try {
        const result: UpdateResult = await col.updateOne({_id: objectId}, {$set: updatedMessage})
        return result
    } catch (error) {
        throw new Error('Could not update collection')
    }
}

async function deleteMessage(id: string): Promise<DeleteResult> {
    const col = getMessageCollection()
    let objectId: ObjectId
    try {
        objectId = new ObjectId(id)
    } catch (error) {
        throw new Error('Invalid id')
    }
    try {
        const result: DeleteResult = await col.deleteOne({_id: objectId})
        if (result.deletedCount === 0) {
            throw new Error(`id: ${id} not found`)
        }
        return result
    } catch (error) {
        throw new Error('Could not delete from collection')
    }
}

export { getAllMessages, postNewMessage, editMessage, deleteMessage }