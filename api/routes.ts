import * as express from 'express';
import { getLocations } from './locations/index';

const router = express.Router({mergeParams: true});

router.post('/refdata/location', getLocations);

// @ts-ignore
export default router;