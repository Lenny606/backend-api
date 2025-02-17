import {Router} from 'express';

const userRouter = Router()

userRouter.get('/', (req,res) => { res.send("hello")})
userRouter.get('/:id', () => { res.send("hello")})
userRouter.post('/', () => { res.send("hello")})
userRouter.put('/:id', () => { res.send("hello")})
userRouter.delete('/:id', () => { res.send("hello")})

export default userRouter;