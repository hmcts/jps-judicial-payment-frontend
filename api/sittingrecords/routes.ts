import { Router } from 'express'
import { getSittingRecords, addSittingRecords } from './index';

const sittingRecordsRouter = Router({mergeParams: true});

sittingRecordsRouter.post('/searchSittingRecords', getSittingRecords);
sittingRecordsRouter.post('/add', addSittingRecords);

export default sittingRecordsRouter;