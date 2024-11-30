import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import { Message } from '../data/datastructures.js'
import { getAllMessages, postNewMessage } from '../endpoints/messages.js'
import { validateMessage } from '../validation/messageValidation.js'

export const router: Router = express.Router()

router.get('/', async (_, res: Response<WithId<Message>[]>): Promise<void> => {
    try {
        const allMesssages: WithId<Message>[] = await getAllMessages()
        res.status(200).send(allMesssages)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post('/', async (req: Request, res: Response): Promise<void> => {
    const validationResult = validateMessage(req.body)
    if (!validationResult.success) {
        console.log('validation is failing for some reason');
        
        res.status(400).json({error: validationResult.error}); 
        return
    }
    try {
        const newMessage: Message = req.body as Message
        const createdMessage = await postNewMessage(newMessage)
        res.status(201).send(createdMessage)
    } catch (error) {
        res.sendStatus(500)
    }
})