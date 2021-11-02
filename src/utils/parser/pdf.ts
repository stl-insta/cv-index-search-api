import { PdfTextExtractor } from './pdf-text-extractor';

const pdfParser = async (path: string, fileName: string): Promise<string> => {
  const parser = new PdfTextExtractor();
  const savePath = './assets/cv/img';
  parser.setFile(path, savePath, fileName);

  return parser.extractText();
};

export default pdfParser;
