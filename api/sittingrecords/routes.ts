import { Router } from 'express'
import { addSittingRecords, deleteSittingRecord, getSittingRecords, getPublishedRecords } from './index';

const sittingRecordsRouter = Router({mergeParams: true});

sittingRecordsRouter.post('/searchSittingRecords', getSittingRecords);
sittingRecordsRouter.delete('/:id', deleteSittingRecord);
sittingRecordsRouter.post('/add', addSittingRecords);
sittingRecordsRouter.post('/publishRecords', getPublishedRecords)


export default sittingRecordsRouter;