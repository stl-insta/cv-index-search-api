import fs from 'fs';
import docx4js from 'docx4js';
import xml2js from 'xml2js';

const wordParser = async (
  url: string,
  newXml: string,
  newFile: string
): Promise<void> => {
  docx4js.load(url).then((docx: any) => {
    fs.writeFile(
      newXml,
      docx.raw.files['word/document.xml'].asText(),
      (err) => {
        console.log(err);
      }
    );
    console.log('create xml');
  });
  await xmlParser(newXml, newFile);
};
const xmlParser = (newXml: string, newFile: string) => {
  const xml = fs.readFileSync(newXml);
  xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
    if (err) {
      throw err;
    }
    const json = JSON.stringify(result, null, 4);
    fs.writeFileSync(newFile, json);
    console.log('create json');
  });
};

export default wordParser;
