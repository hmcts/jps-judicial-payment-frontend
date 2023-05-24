import * as express from 'express';
import { getXuiNodeMiddleware } from './auth';
import refDataRouter from './refdata/routes';
import sittingRecordRouter from './sittingRecords/routes'

export const app = express();

app.use(express.json())

app.use('/refdata', refDataRouter)
app.use('/sittingRecords', sittingRecordRouter)
app.use(getXuiNodeMiddleware());