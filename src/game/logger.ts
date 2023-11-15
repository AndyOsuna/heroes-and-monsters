export default class Logger {
  constructor(public logs: string[] = []) {}

  log(text: string) {
    this.logs.unshift(text);
    console.log(text);
  }
}
