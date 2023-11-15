export default class Logger {
    static log: any;
    constructor(public logs: string[] = []) {}
  
    log(text: string) {
      this.logs.unshift(text);
      console.log(text);
    }
  }