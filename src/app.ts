import express, { Application, Request, Response } from 'express'
const app: Application = express();
import cors from "cors"
import morgan from "morgan"
import router from './app/modules/users/user.route';

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.use('/api/v1/users', router)

app.get('/', (req: Request, res: Response) => {
    res.send('University management Server is running')
})



export default app