import { Router } from 'express'
import { getSittingRecords, addSittingRecords } from './index';

const sittingRecordsRouter = Router({mergeParams: true});

sittingRecordsRouter.post('/add', addSittingRecords)
sittingRecordsRouter.post('/searchSittingRecords', getSittingRecords);

export default sittingRecordsRouter;