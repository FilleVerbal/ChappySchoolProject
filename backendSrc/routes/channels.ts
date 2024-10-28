import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import { Channel } from '../data/datastructures.js'
import { getAllChannels, postNewChannel } from '../endpoints/getChanels.js'

export const router: Router = express.Router()

router.get('/', async (_, res: Response<WithId<Channel>[]>): Promise<void> => {
    try {
        const allChannels: WithId<Channel>[] = await getAllChannels()
        res.status(200).send(allChannels)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const newChannel: Channel = req.body as Channel
        const createdChannel = await postNewChannel(newChannel)
        res.status(201).send(createdChannel)    
    } catch (error) {
        res.sendStatus(500);
    }
})

// router.get('/search', async (req: Request, res: Response<WithId<Channel>[]>): Promise<void> => {
//     try {
//         const  name  = req.query.name as string | undefined
//         if (name === undefined || name === '') {
//             res.sendStatus(400); return
//         }
//         const filteredChannels: WithId<Channel>[] = await getFilteredChannels(name)
//         if (filteredChannels.length <= 0) {
//             res.sendStatus(404); return
//         }
//         res.status(200).send(filteredChannels); return
//     } catch (error) {
//         res.sendStatus(500); return
//     }
// })
// router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
//     try {
//         const {id} = req.params
//         const result = await deleteChannel(id)
//         if (result.deletedCount === 0) {
//             res.sendStatus(404)
//         }
//         res.sendStatus(200)
//     } catch (error) {
//         res.sendStatus(500)
//     }
// })