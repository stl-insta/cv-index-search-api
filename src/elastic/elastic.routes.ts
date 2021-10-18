import { Router } from 'express';

import * as controller from './elastic.controller';

export const elasticRouter: Router = Router({ mergeParams: true });

elasticRouter.post('/index', controller.create_index);
