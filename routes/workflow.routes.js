import {Router} from 'express';

const workflowRouter = Router();

workflowRouter.get('/', () => { res.send("hello")})

export default workflowRouter;