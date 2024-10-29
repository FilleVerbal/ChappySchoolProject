import { WithId, InsertOneResult } from "mongodb"
import { UserProfile } from '../data/datastructures.js'
import { getUserCollection } from "../database/getdb.js"

async function getAllUsers(): Promise<WithId<UserProfile>[]> {
    const col = getUserCollection()
    try {
        const result: WithId<UserProfile>[] = await col.find({}).toArray()
        return result
    } catch (error) {
        throw new Error('Could not get users')
    }
}

async function postNewUser(newUser: UserProfile): Promise<InsertOneResult<UserProfile>> {
    const col = getUserCollection()
    try {
        const result: InsertOneResult<UserProfile> = await col.insertOne(newUser)
        return result
    } catch (error) {
        throw new Error('Could not add user')
    }
}

async function checkUsersForLogin(email: string, password: string): Promise<WithId<UserProfile> | null> {
    const users = await getAllUsers()
    const correctUser = users.find(user => user.email === email)
    if (correctUser && correctUser.password === password) {
        return correctUser
    } else {
        return null
    }
}

// async function updateUser(id: string, updatedUser: Partial<UserProfile>): Promise<UpdateResult> {
//     const col = getUserCollection()
//     let objectId: ObjectId
//     try {
//         objectId = new ObjectId(id)
//     } catch (error) {
//         throw new Error('Invalid id')
//     }
//     try {
//         const result: UpdateResult = await col.updateOne({_id: objectId}, {$set: updatedUser})
//         return result
//     } catch (error) {
//         throw new Error('Could not update the collection')
//     }
// }

// async function deleteUser(id: string): Promise<DeleteResult> {
//     const col = getUserCollection()
//     let objectId: ObjectId
//     try {
//         objectId = new ObjectId(id)
//     } catch (error) {
//         throw new Error('Invalid id')
//     }
//     try {
//         const result: DeleteResult = await col.deleteOne({_id: objectId})
//         if (result.deletedCount === 0) {
//             throw new Error(`id: ${id} not found`)
//         }
//         return result
//     } catch (error) {
//         throw new Error('Could not delete from collection')
//     }
// }

export { getAllUsers, postNewUser, checkUsersForLogin }