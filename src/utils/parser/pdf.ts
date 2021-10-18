import fs from 'fs';
import PDFParser from 'pdf2json';

const pdfParser = (url: string, newFile: string) => {
  const parser = new PDFParser();
  parser.loadPDF(url);

  parser.on('pdfParser_dataError', (errData) =>
    console.error(errData.parserError)
  );
  parser.on('pdfParser_dataReady', (pdfData) => {
    fs.writeFile(newFile, JSON.stringify(pdfData), (err) => {
      console.log(err);
    });
  });
};

export default pdfParser;
