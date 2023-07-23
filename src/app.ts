import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express();
import cors from "cors"
import morgan from 'morgan';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.use('/api/v1', router)

app.use(globalErrorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: 'Not Found',
        errorMessage: [{
            path: req.originalUrl,
            message: 'API not found'
        }]
    })
    next()
})

app.get('/', async (req: Request, res: Response) => {
    res.send('University management Server is running')
})



export default app