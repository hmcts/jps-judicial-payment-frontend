import { Router } from 'express'
import { getLocations } from './locations/index';

const refDataRouter = Router({mergeParams: true});

refDataRouter.post('/location', getLocations);

export default refDataRouter;