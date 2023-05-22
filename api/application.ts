import * as express from 'express';
import { getXuiNodeMiddleware } from './auth';
import router from './locations/routes';

export const app = express();

app.use(express.json())

app.use('/refdata', router)
app.use(getXuiNodeMiddleware());