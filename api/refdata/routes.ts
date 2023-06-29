import { Router } from 'express'
import { getVenues, getRegions } from './locations/index';

const refDataRouter = Router({mergeParams: true});

refDataRouter.post('/location', getVenues);
refDataRouter.post('/location/regions', getRegions);


export default refDataRouter;