import {Router} from 'express';
import { createSubscription } from '../controllers/subscription.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const subscriptionRouter = Router()

subscriptionRouter.get('/', () => { res.send("hello")})
subscriptionRouter.get('/:id', () => { res.send("hello")})
subscriptionRouter.get('/user/:id', () => { res.send("hello")})
subscriptionRouter.get('/:id', () => { res.send("hello")})
subscriptionRouter.get('/upcoming-renewals',() => { res.send("hello")})
subscriptionRouter.post('/',authMiddleware, createSubscription)
subscriptionRouter.put('/:id',authMiddleware, getSubscriptionsByUser)
subscriptionRouter.put('/:id/cancel', () => { res.send("hello")})
subscriptionRouter.delete('/:id', () => { res.send("hello")})

export default subscriptionRouter;