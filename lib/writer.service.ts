export default class WriterService {
  private filename: string = "";

  constructor(private readonly dir?: string) {}

  public setFilename(filename: string) {
    this.filename = filename;
  }

  public write(definition: string) {
    if (this.dir) {
      this.writeToFile(definition);
    } else {
      this.writeToOutput(definition);
    }
  }

  private writeToOutput(definition: string): void {
    console.log(definition);
  }

  private writeToFile(definition: string): void {}
}
