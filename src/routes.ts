import { Router } from 'express';

import { homeRouter } from './home/home.routes';

const router: Router = Router();

router.use('/', homeRouter);

export default router;
