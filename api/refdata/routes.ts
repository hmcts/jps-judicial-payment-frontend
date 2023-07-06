import { Router } from 'express'
import { getLocations, getRegions } from './locations/index';

const refDataRouter = Router({mergeParams: true});

refDataRouter.post('/location', getLocations);
refDataRouter.post('/location/regions', getRegions);


export default refDataRouter;