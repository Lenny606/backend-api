import {Router} from 'express';

const subscriptionRouter = Router()

subscriptionRouter.get('/', () => { res.send("hello")})
subscriptionRouter.get('/:id', () => { res.send("hello")})
subscriptionRouter.get('/user/:id', () => { res.send("hello")})
subscriptionRouter.get('/:id', () => { res.send("hello")})
subscriptionRouter.get('/upcoming-renewals',() => { res.send("hello")})
subscriptionRouter.post('/', () => { res.send("hello")})
subscriptionRouter.put('/:id', () => { res.send("hello")})
subscriptionRouter.put('/:id/cancel', () => { res.send("hello")})
subscriptionRouter.delete('/:id', () => { res.send("hello")})

export default subscriptionRouter;