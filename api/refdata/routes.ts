import { Router } from 'express'
import { getUsers, getUserInfo } from './users/index';
import { getLocations, getRegions } from './locations/index';

const refDataRouter = Router({mergeParams: true});

refDataRouter.post('/location', getLocations);
refDataRouter.post('/user', getUsers);
refDataRouter.post('/userInfo', getUserInfo);
refDataRouter.post('/location/regions', getRegions);


export default refDataRouter;