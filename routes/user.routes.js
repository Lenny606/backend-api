import {Router} from 'express';
import { getUsers } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const userRouter = Router()

userRouter.get('/', authMiddleware, getUsers)
userRouter.get('/:id', authMiddleware, getUser)
userRouter.post('/', authMiddleware,createUser)
userRouter.put('/:id', () => { res.send("hello")})
userRouter.delete('/:id', () => { res.send("hello")})

export default userRouter;