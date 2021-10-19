import { Router } from 'express';

import * as controller from './cv.controller';

export const cvRouter: Router = Router({ mergeParams: true });
//elastic
// cvRouter.post('/', controller.insert);
cvRouter.get('/search', controller.search);
cvRouter.delete('/', controller.remove);
// cv file
// cvRouter.get('/', controller.list);
// cvRouter.get('/:id', controller.get);
cvRouter.post('/', controller.create);
// cvRouter.put('/:id', controller.update);
// cvRouter.delete('/:id', controller.delete);
