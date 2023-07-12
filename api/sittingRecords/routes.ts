import { Router } from 'express'
import { addSittingRecords, deleteSittingRecord, getSittingRecords } from './index';

const sittingRecordsRouter = Router({mergeParams: true});

sittingRecordsRouter.post('/searchSittingRecords', getSittingRecords);
sittingRecordsRouter.delete('/:id', deleteSittingRecord);
sittingRecordsRouter.post('/add', addSittingRecords);


export default sittingRecordsRouter;