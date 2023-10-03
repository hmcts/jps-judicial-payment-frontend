import { Router } from 'express'
import { getJohAttributes, postJohAttributes } from './index';

const johRouter = Router({mergeParams: true});

johRouter.get('/johAttributes/:personalCode', getJohAttributes);
johRouter.post('/johAttributes/:personalCode', postJohAttributes);


export default johRouter;