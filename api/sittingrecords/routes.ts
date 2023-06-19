import { Router } from 'express'
import { addSittingRecords } from './index';

const sittingRecordsRouter = Router({mergeParams: true});

sittingRecordsRouter.post('/add', addSittingRecords);

export default sittingRecordsRouter;