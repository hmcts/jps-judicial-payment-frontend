import { Router } from 'express'
import { getLocations } from './index';

export const router = Router({mergeParams: true});

router.post('/location', getLocations);

export default router;