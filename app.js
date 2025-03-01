import express from 'express';
import cookieParser from 'cookie-parser';
import {PORT} from './env.js'
import {connectDB} from "./database/db.js";
import {errorMiddleware} from "./middleware/error.middleware.js";

const app = express()
//BAD CODE !!!!!!!!!!!!!!!

//MW
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false}))
app.use(errorMiddleware)

//ROUTES
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";


app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)


app.listen(PORT, async () => {
    console.log(`API running on http://localhost:${PORT}`)

    await connectDB()
})


export default app;