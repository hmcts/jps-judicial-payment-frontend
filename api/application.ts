import * as express from 'express';
import { getXuiNodeMiddleware } from './auth';
import refDataRouter from './refdata/routes';

export const app = express();

app.use(express.json())

app.use('/refdata', refDataRouter)
app.use(getXuiNodeMiddleware());