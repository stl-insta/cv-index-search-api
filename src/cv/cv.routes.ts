import { Router } from 'express';

import * as controller from './cv.controller';

export const cvRouter: Router = Router({ mergeParams: true });
cvRouter.get('/search', controller.search);
cvRouter.get('/', controller.get);
cvRouter.post('/', controller.create);
cvRouter.delete('/', controller.remove);
