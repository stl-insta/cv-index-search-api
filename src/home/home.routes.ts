import { Router } from 'express';

import * as controller from './home.controller';

export const homeRouter: Router = Router({ mergeParams: true });

homeRouter.get('/', controller.index);
