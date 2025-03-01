import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {PORT} from './env.js'

const app = express()

//ROUTES
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import {connectDB} from "./database/db.js";

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)


app.listen(PORT, async () => {
    console.log(`API running on http://localhost:${PORT}`)

    await connectDB()
})


export default app;