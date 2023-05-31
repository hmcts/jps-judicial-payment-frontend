import { Router } from 'express'
import { getLocations } from './locations/index';
import { getUser } from './users/index';

const refDataRouter = Router({mergeParams: true});

refDataRouter.post('/location', getLocations);
refDataRouter.post('/user', getUser);

export default refDataRouter;