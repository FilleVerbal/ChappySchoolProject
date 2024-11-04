import express, { Request, Response, Router } from 'express'
import { WithId } from 'mongodb'
import jwt from 'jsonwebtoken'
import { UserProfile } from '../data/datastructures.js'
import { postNewUser, checkUsersForLogin, getAllUsersProjected } from '../endpoints/users.js'
import { validateNewUser } from '../validation/validateUserCreation.js';

// const { sign, verify } = jwt

export const router: Router = express.Router();

router.get('/', async (_, res: Response<WithId<UserProfile>[]>): Promise<void> => {
    try {
        const allUsers: WithId<UserProfile>[] = await getAllUsersProjected()
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

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    console.log('Trying to reach login request');
    
    if (!process.env.SECRET_KEY) {
        res.sendStatus(505)
        return
    }
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.sendStatus(400);
            return
        }
        const user = await checkUsersForLogin(email, password)
        if (!user) {
            res.sendStatus(401);
            return
        }

        const token = jwt.sign(
            { userid: user._id, email: user.email },
            String(process.env.SECRET_KEY) 
        )
        res.status(200).send({ token })
    } catch (error) {
        
        console.error('login error: ', error)
        res.sendStatus(500)
    }
})