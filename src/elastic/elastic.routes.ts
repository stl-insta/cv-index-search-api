import { Router } from 'express';

import * as controller from './elastic.controller';

export const elasticRouter: Router = Router({ mergeParams: true });

elasticRouter.get('/index', controller.get_index);
elasticRouter.post('/index', controller.create_index);
elasticRouter.delete('/index', controller.delete_index);
elasticRouter.put('/index', controller.update_index);
