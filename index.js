import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import router from './router/index.js'
import errorMiddleware from "./middleware/error-middleware.js";
import authRouter from "./router/authRouter.js";
import authMiddleware from "./middleware/auth-middleware.js";

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
//Routes
app.use('/api', authMiddleware, router)
app.use('/auth', authRouter)

//Middlewares
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("DB connected successfully")
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()