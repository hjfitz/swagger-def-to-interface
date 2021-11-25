import { Command } from "commander";
import { join, sep } from "path";
import { ProgramOptions } from "./types";

export default class CliService {
  constructor(
    private readonly program: Command,
    private readonly options: ProgramOptions
  ) {}

  private showHelp(message?: string) {
    if (message) console.error(message);
    console.error(this.program.help());
  }

  public verifyInputsOrDie(): void {
    if (!this.options.file) {
      this.showHelp("Missing file (-f, --file)");
      process.exit(1);
    }
  }

  public getModuleLocation(): string {
    const absFileArr = join(process.cwd(), this.options.file).split(sep);
    absFileArr.pop();
    return absFileArr.join(sep);
  }
}
