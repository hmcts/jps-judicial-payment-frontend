import * as express from 'express';
import { getXuiNodeMiddleware } from './auth';

export const app = express();

app.use(getXuiNodeMiddleware());
