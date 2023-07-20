import express, { Application, Request, Response } from 'express'
const app: Application = express();
import cors from "cors"
import morgan from 'morgan';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/users/users.route';


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.use("/api/v1/users", UserRoutes)

app.use(globalErrorHandler)

app.get('/', (req: Request, res: Response) => {
    res.send('University management Server is running')
    // throw new ApiError(400, "uninitialized error");
})



export default app