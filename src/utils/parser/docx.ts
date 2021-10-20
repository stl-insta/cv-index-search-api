import fs from 'fs';
import docx4js from 'docx4js';
import xml2js from 'xml2js';

const wordParser = async (url: string, fileName: string): Promise<string> => {
  const docx = await docx4js.load(url);
  const newXml = `./assets/cv/xml/${fileName}.xml`;
  fs.writeFileSync(newXml, docx.raw.files['word/document.xml'].asText());
  return xmlParser(newXml);
};

const xmlParser = async (newXml: string): Promise<string> => {
  const xml = fs.readFileSync(newXml);
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
      if (err) {
        reject(err);
      }
      const json = JSON.stringify(result, null, 4);
      resolve(json);
    });
  });
};

export default wordParser;
