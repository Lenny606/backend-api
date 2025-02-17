import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {PORT} from './env.js'

//ROUTES
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", authRouter)
app.use("/api/v1/subscriptions", authRouter)





app.listen(PORT, () => {
    res.send(`API running on http://localhost:${PORT}`)
})


