import { WithId, Filter, InsertOneResult, UpdateResult, ObjectId, DeleteResult } from "mongodb";
import { Channel } from "../data/datastructures.js";
import { getChannelCollection } from "../database/getdb.js";

async function getAllChannels(): Promise<WithId<Channel>[]> {
    const col = getChannelCollection()
    try {
        const result: WithId<Channel>[] = await col.find({}).toArray()
        console.log('getAllChannels result is: ', result);
        return result
    } catch (error) {
        // console.error('Error getting all channels', error)
        throw new Error('Could not get channels')
    }
}

async function getFilteredChannels(query: string): Promise<WithId<Channel>[]> {
    const col = getChannelCollection()
    const filter: Filter<Channel> = {}
    try {
        const searchQuery = query.trim()
        if (searchQuery.length > 0) {
            filter.name = {$regex: searchQuery, $options: 'i'}
        }
        const result: WithId<Channel>[] = await col.find(filter).toArray()
        console.log('Filtered search result: ', result);        
        return result
    } catch (error) {
        throw new Error('Could not get filtered channels')
    }
}

async function postNewChannel(newChannel: Channel): Promise<InsertOneResult<Channel>> {
    const col = getChannelCollection()
    try {
        const result: InsertOneResult<Channel> = await col.insertOne(newChannel)
        console.log('Channel added to channelcollection ', result);
        return result
    } catch (error) {
        throw new Error('Could not add channel to collection')
    }
}

async function updateChannel(id: string, updatedChannel: Partial<Channel>): Promise<UpdateResult> {
    const col = getChannelCollection()
    let objectId: ObjectId
    try {
        objectId = new ObjectId(id)
    } catch (error) {
        throw new Error('Invalid id')
    }
    try {
        const result: UpdateResult = await col.updateOne( {_id: objectId}, {$set: updatedChannel})
        return result
    } catch (error) {
        throw new Error('Could not update channelcollection')
    }
}

async function deleteChannel(id: string): Promise<DeleteResult> {
    const col = getChannelCollection()
    let objectId : ObjectId
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

export { getAllChannels, getFilteredChannels, postNewChannel, updateChannel, deleteChannel }