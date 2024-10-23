import express, { Response, Router } from 'express'
import { WithId } from 'mongodb'
import { Channel } from '../data/datastructures.js'
import { getAllChannels } from '../endpoints/getChanels.js'

export const router: Router = express.Router()

router.get('/', async (_, res: Response<WithId<Channel>[]>) => {
    try {
        const allChannels: WithId<Channel>[] = await getAllChannels()
        res.status(200).send(allChannels)
    } catch (error) {
        res.sendStatus(500)
    }
})
