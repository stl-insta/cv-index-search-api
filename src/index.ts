import fs from 'fs';
import PDFParser from 'pdf2json';
import docx4js from 'docx4js';
import xml2js from 'xml2js';

import app from './app';
import logger from './utils/logger';
import config from './config/config';
import nodeErrorHandler from './resources/middlewares/nodeErrorHandler';

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
pdfParser.loadPDF('./assets/cv/pdf/alid.pdf');

pdfParser.on('pdfParser_dataError', (errData: any) =>
  console.error(errData.parserError)
);
pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
  fs.writeFile(
    './assets/json/pdf/alid.json',
    JSON.stringify(pdfData),
    (err) => {
      console.log(err);
    }
  );
});

docx4js.load('./assets/cv/docx/wlin.docx').then((docx: any) => {
  fs.writeFile(
    './assets/cv/xml/wlin.xml',
    docx.raw.files['word/document.xml'].asText(),
    (err) => {
      console.log(err);
    }
  );
  console.log('create xml');
});

const xml = fs.readFileSync('./assets/cv/xml/wlin.xml');
xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
  if (err) {
    throw err;
  }
  const json = JSON.stringify(result, null, 4);
  fs.writeFileSync('./assets/json/docx/wlin.json', json);
  console.log('create json');
});
