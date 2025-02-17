import {Router} from 'express';

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.post('/', getUser)
userRouter.put('/:id', getUser)
userRouter.delete('/:id', getUser)

export default userRouter;