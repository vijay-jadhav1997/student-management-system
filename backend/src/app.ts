
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import StudentRouter from './router/student.router'
import AuthRouter from './router/auth.router'
import { config } from './config'
import MarksRouter from './router/marks.router'
import AuthMiddleware from './middleware/auth.middleware'



const app = express()

app.use(cors({
  origin: config.clientUrl,
  credentials: true
}))

app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use("/auth", AuthRouter)
app.use('/student', AuthMiddleware, StudentRouter)
app.use('/student/marks', AuthMiddleware, MarksRouter)

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: `API method & endpoint - ${req.method}: ${req.url} not found` })
})

export default app
