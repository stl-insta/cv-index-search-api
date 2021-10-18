import { Router } from 'express';

import * as controller from './cv.controller';

export const cvRouter: Router = Router({ mergeParams: true });

cvRouter.post('/', controller.insert_cv);
