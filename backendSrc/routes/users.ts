import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import { UserProfile } from '../data/datastructures.js'
import { getAllUsers, postNewUser } from '../endpoints/users.js'
import { validateNewUser } from '../validation/validateUserCreation.js';

export const router: Router = express.Router();

router.get('/', async (_, res: Response<WithId<UserProfile>[]>): Promise<void> => {
    try {
        const allUsers: WithId<UserProfile>[] = await getAllUsers()
        res.status(200).send(allUsers)
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post('/create', async (req: Request, res: Response): Promise<void> => {
    const validationResult = validateNewUser(req.body)
    if (!validationResult.success) {
        res.status(400).json ({ error: validationResult.error});
        return
    }
    try {
        const newUser: UserProfile = req.body as UserProfile
        const createdUser =  await postNewUser(newUser)
        res.status(201).send(createdUser)
    } catch (error) {
        res.sendStatus(500)
    }
})