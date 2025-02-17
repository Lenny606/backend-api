import {Router} from 'express';

const authRouter = Router()

authRouter.post('/sign-up', () => { res.send("hello")})
authRouter.post('/sign-in', () => { res.send("hello")})
authRouter.post('/sign-out', () => { res.send("hello")})


export default authRouter;
