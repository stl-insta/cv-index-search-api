import app from './app';
import logger from './utils/logger';
import config from './config/config';
import nodeErrorHandler from './resources/middlewares/nodeErrorHandler';
// import pdfParser from './utils/parser/pdf';
// import wordParser from './utils/parser/docx';

const { port } = config;

if (!port) {
  throw new Error('App Port not assigned.');
}

app
  .listen(+port, () => {
    logger.log('info', `Server started at http://localhost:${port}`);
  })
  .on('error', nodeErrorHandler);
