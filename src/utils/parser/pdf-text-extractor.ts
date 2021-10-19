import { fromPath } from 'pdf2pic';
import { Options } from 'pdf2pic/dist/types/options';
import { WriteImageResponse } from 'pdf2pic/dist/types/writeImageResponse';
import * as tesseract from 'node-tesseract-ocr';
import * as fs from 'fs';
import logger from '../logger';

export interface IPdfTextExtractor {
  // eslint-disable-next-line no-unused-vars
  setFile(filePath: string, savePath: string, saveFilename: string): void;

  extractText(): Promise<string>;
}

/**
 * Extract text from pdf
 *
 * First convert pdf to png
 *
 * Then extract text from png with tesseract ocr
 */
export class PdfTextExtractor implements IPdfTextExtractor {
  private filePath!: string;
  private savePath!: string;
  private saveFilename!: string;

  public setFile(path: string, savePath: string, saveFilename: string) {
    this.filePath = path;
    this.savePath = savePath;
    this.saveFilename = saveFilename;
  }

  public async extractText(): Promise<string> {
    /** Convert pdf to img **/
    const images = await PdfTextExtractor.pdfToImg(
      this.filePath,
      this.savePath,
      this.saveFilename
    );
    if (!images) {
      return Promise.reject('Could not convert PDF to IMG');
    }

    /** Extract text from images **/
    const extractors: Promise<string>[] = [];
    images.forEach((path: string) =>
      extractors.push(PdfTextExtractor.imgToText(path))
    );
    const results: string[] = await Promise.all(extractors);
    if (!results) {
      return Promise.reject('Could not extract text from IMG');
    }
    const text = results.join();

    /** Remove created images **/
    images.forEach((path: string) => PdfTextExtractor.clearArtifacts(path));

    return text;
  }

  private static async imgToText(path: string): Promise<string> {
    const tesseractOption = {
      lang: 'fra',
      oem: 1,
      psm: 3
    };
    return tesseract.recognize(path, tesseractOption);
  }

  public static async pdfToImg(
    filePath: string,
    savePath: string,
    saveFilename: string
  ): Promise<string[]> {
    const pdf2ImgOption: Options = {
      density: 100,
      saveFilename,
      savePath,
      format: 'png',
      width: 800,
      height: 800
    };

    const { bulk } = fromPath(filePath, pdf2ImgOption);
    if (!bulk) {
      return Promise.reject('Could not convert PDF to IMG');
    }
    const img: WriteImageResponse[] = await bulk(-1, false);
    if (!img) {
      return Promise.reject('Could not convert PDF to IMG');
    }
    return Promise.resolve(<string[]>img.map((i) => i.path));
  }

  private static clearArtifacts(filePath: string): boolean {
    try {
      fs.unlinkSync(filePath);
      return true;
    } catch (err) {
      logger.log({
        level: 'error',
        message: JSON.stringify(err)
      });
      return false;
    }
  }
}
