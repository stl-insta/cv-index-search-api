import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import fileUpload from 'express-fileupload';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

import routes from './routes';
import logHandler from './resources/middlewares/logHandler';
import notFoundHandler from './resources/middlewares/notFoundHandler';
import transactionHandler from './resources/middlewares/transactionHandler';
import genericErrorHandler from './resources/middlewares/genericErrorHandler';

const app: express.Application = express();

app.use(
  fileUpload({
    createParentPath: true,
    safeFileNames: true,
    preserveExtension: 4 // extensions of length 4 maximum
  })
);

app.use(cors());
app.use(helmet());
app.use(transactionHandler);
app.use(logHandler);
app.use(express.json({ limit: '300kb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// make the uploaded files publicly accessible from anywhere by making directory static
// e.g. http://localhost:8000/assets/cv/pdf/wlin.pdf
app.use('/assets', express.static('assets'));

app.use('/', routes);

app.use(genericErrorHandler);
app.use(notFoundHandler);

export default app;
