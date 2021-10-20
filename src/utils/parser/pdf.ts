import PdfParser from 'pdf2json';

const pdfParser = async (path: string): Promise<string> => {
  const parser = new PdfParser();
  parser.loadPDF(path);
  return new Promise((resolve, reject) => {
    parser.on('pdfParser_dataError', (errData) => {
      reject(errData);
    });
    parser.on('pdfParser_dataReady', (pdfData) => {
      resolve(JSON.stringify(pdfData));
    });
  });
};

export default pdfParser;
