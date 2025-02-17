import {Router} from 'express';

const subscriptionRouter = Router()

subscriptionRouter.get('/', getSubscriptions)
subscriptionRouter.get('/:id', getSubscription)
subscriptionRouter.post('/', getSubscription)
subscriptionRouter.put('/:id', getSubscription)
subscriptionRouter.delete('/:id', getSubscription)

export default subscriptionRouter;