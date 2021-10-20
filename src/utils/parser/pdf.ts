import fs from 'fs';
import PDFParser from 'pdf2json';

const pdfParser = async (url: string, newFile: string): Promise<string> => {
  const parser = new PDFParser();
  parser.loadPDF(url);
  return new Promise((resolve, reject) => {
    parser.on('pdfParser_dataError', (errData) => {
      reject(errData);
    });
    parser.on('pdfParser_dataReady', (pdfData) => {
      const data = JSON.stringify(pdfData);
      fs.writeFileSync(newFile, data);
      resolve(data);
    });
  });
};

export default pdfParser;
