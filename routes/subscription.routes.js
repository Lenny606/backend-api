import {Router} from 'express';

const subscriptionRouter = Router()

subscriptionRouter.get('/', getSubscriptions)
subscriptionRouter.get('/:id', getSubscription)
subscriptionRouter.get('/user/:id', getSubscription)
subscriptionRouter.get('/:id', getSubscription)
subscriptionRouter.get('/upcoming-renewals', getUpcomingRenewals)
subscriptionRouter.post('/', getSubscription)
subscriptionRouter.put('/:id', getSubscription)
subscriptionRouter.put('/:id/cancel', cancelSubscription)
subscriptionRouter.delete('/:id', deleteSubscription)

export default subscriptionRouter;