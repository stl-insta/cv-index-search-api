declare module 'pdf2json' {
  type PDFParserDataReadyEvent = 'pdfParser_dataReady';
  type PDFParserDataErrorEvent = 'pdfParser_dataError';

  export interface PDFPagesFill {
    x: number;
    y: number;
    clr: number;

    /**
     * (Width)
     */
    w: number;

    /**
     * (Height)
     */
    h: number;

    /**
     * Color
     */
    oc: string;
  }

  export interface PDFPageText {
    x: number;
    y: number;
    sw: number;
    text: string;

    /**
     * Text Color
     */
    oc: string;
  }

  export interface PDFPage {
    Fills: Array<PDFPagesFill>;
    Texts: Array<PDFPageText>;
  }

  interface PDFFormImage {
    Pages: Array<PDFPage>;
  }

  export interface PDFDataReady {
    formImage: PDFFormImage;
  }

  export type PDFParserError = {
    parserError: Error;
  };

  export type PDFPagesFills = Array<PDFPagesFill>;
  export type PDFPageTexts = Array<PDFPageText>;

  class PdfParser {
    // Data Ready
    on(
      eventName: PDFParserDataReadyEvent,
      callback: (data: PDFDataReady) => void
    ): void;

    // Data Error
    on(
      eventName: PDFParserDataErrorEvent,
      callback: (error: PDFParserError) => void
    ): void;

    parseBuffer(buffer: Buffer): void;
    loadPDF(url: string): void;
  }

  export default PdfParser;
}
