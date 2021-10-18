import { Router } from 'express';

import { homeRouter } from './home/home.routes';
import { elasticRouter } from './elastic/elastic.routes';
import { cvRouter } from './cv/cv.routes';

const router: Router = Router();

router.use('/', homeRouter);
router.use('/elastic', elasticRouter);
router.use('/cv', cvRouter);

export default router;
