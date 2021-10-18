import app from './app';
import logger from './utils/logger';
import config from './config/config';
<<<<<<< HEAD
import nodeErrorHandler from './resources/middlewares/nodeErrorHandler';
=======
import nodeErrorHandler from './middlewares/nodeErrorHandler';
import fs from 'fs';
import PDFParser from 'pdf2json';
>>>>>>> 58378eb... feat: 🎸 add pdf to json feature

const { port } = config;

if (!port) {
  throw new Error('App Port not assigned.');
}

app
  .listen(+port, () => {
    logger.log('info', `Server started at http://localhost:${port}`);
  })
  .on('error', nodeErrorHandler);

const pdfParser = new PDFParser();
pdfParser.loadPDF('./assets/cv/alid.pdf');

pdfParser.on('pdfParser_dataError', (errData: any) =>
  console.error(errData.parserError)
);
pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
  fs.writeFile('./assets/json/alid.json', JSON.stringify(pdfData), (err) => {
    console.log(err);
  });
});
