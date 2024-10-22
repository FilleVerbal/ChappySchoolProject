import express, {Express, NextFunction, Request } from 'express'
import cors from 'cors'
import { getDb } from './database/getdb.js'

const app: Express = express()
const port = Number(process.env.PORT || 1234)

async function startServer() {
    try {
        await getDb()
        app.use(cors())
        console.log('Databaseconnection successfull');

        app.use(express.json())
        app.use('/', (req: Request, _, next: NextFunction) => {
            console.log(`${req.method} ${req.url}`, req.body);
            next()
            
        })

        app.listen(port, () => {
            console.log('Server is listening on port ', port);
            
        })
        
    } catch (error) {
        console.error('Error connecting to the db', error)
    }
}

startServer()