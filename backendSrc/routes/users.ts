import express, { Response, Router } from 'express'
import { WithId } from 'mongodb'
import { UserProfile } from '../data/datastructures.js'
import { getAllUsers } from '../endpoints/users.js'

export const router: Router = express.Router();

router.get('/', async (_, res: Response<WithId<UserProfile>[]>): Promise<void> => {
    try {
        const allUsers: WithId<UserProfile>[] = await getAllUsers()
        res.status(200).send(allUsers)
    } catch (error) {
        res.sendStatus(500)
    }
})

