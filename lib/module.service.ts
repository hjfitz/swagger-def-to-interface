import { join, resolve, sep } from "path";
import { ExportMap } from "./types";

export default class ModuleService {
  static getPath(dir: string): string {
    const splitPath = dir.split(sep);
    splitPath.pop();
    return join(process.cwd(), splitPath.join(sep));
  }

  static getFilename(absFile: string): string {
    const { length, [length - 1]: filename } = absFile.split(sep);
    return filename;
  }

  constructor(
    private readonly filePath: string,
    private readonly namedExport?: string
  ) {}

  public async fetchExports(): Promise<ExportMap> {
    if (this.namedExport) {
      return this.fetchNamedExport();
    }
    return this.fetchAllExports();
  }

  private getAbsoluteFile(): string {
    const joined = resolve(process.cwd(), this.filePath);
    return joined;
  }

  private async fetchNamedExport(): Promise<ExportMap> {
    if (!this.namedExport) {
      console.error("No named export! Dying");
      process.exit(1);
    }

    const file = this.getAbsoluteFile();

    console.log("Attempting to import:");
    console.log(file);
    const mod = await import(file);
    const filename = ModuleService.getFilename(file);

    const schema = mod[this.namedExport];

    if (!schema) {
      console.error("unable to find schemas");
      return { filename, exports: new Map() };
    }

    return {
      filename,
      exports: new Map([[this.namedExport, schema]]),
    };
  }

  private async fetchAllExports(): Promise<ExportMap> {
    // todo: cleanup import logic
    const file = this.getAbsoluteFile();
    console.log("Attempting to import:");
    console.log(file);
    const mod = await import(file);
    const filename = ModuleService.getFilename(file);
    return { filename, exports: new Map(Object.entries(mod)) };
  }
}
