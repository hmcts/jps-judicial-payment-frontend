import { Router } from 'express'
import { getLocations } from './locations/index';
import { getUsers, getUserInfo } from './users/index';

const refDataRouter = Router({mergeParams: true});

refDataRouter.post('/location', getLocations);
refDataRouter.post('/user', getUsers);
refDataRouter.post('/userInfo', getUserInfo);

export default refDataRouter;