import { Router } from 'express'
import { getSittingRecords, deleteSittingRecord } from './index';

const sittingRecordsRouter = Router({mergeParams: true});

sittingRecordsRouter.post('/searchSittingRecords', getSittingRecords);
sittingRecordsRouter.delete('/:id', deleteSittingRecord);

export default sittingRecordsRouter;