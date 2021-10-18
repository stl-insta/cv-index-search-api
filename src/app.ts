import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

import routes from './routes';
import logHandler from './resources/middlewares/logHandler';
import notFoundHandler from './resources/middlewares/notFoundHandler';
import transactionHandler from './resources/middlewares/transactionHandler';
import genericErrorHandler from './resources/middlewares/genericErrorHandler';

const app: express.Application = express();

app.use(cors());
app.use(helmet());
app.use(transactionHandler);
app.use(logHandler);
app.use(express.json({ limit: '300kb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use(genericErrorHandler);
app.use(notFoundHandler);

export default app;
