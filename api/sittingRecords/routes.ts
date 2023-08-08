import { Router } from 'express'
import { getSittingRecords } from './index';

const sittingRecordsRouter = Router({mergeParams: true});

sittingRecordsRouter.post('/searchSittingRecords', getSittingRecords);

export default sittingRecordsRouter;