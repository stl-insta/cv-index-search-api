declare module 'docx4js' {
  class docx4js {
    // static load(url: string): Promise<any> {
    //   throw new Error('Method not implemented.');
    // }
    static docx: any;
    static load(url: string): Promise<any>;
  }
  export default docx4js;
}
