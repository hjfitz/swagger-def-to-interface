import { CommandOptions } from "commander";
import { SwaggerProperty } from "./swagger.types";

export interface PackageMetadata {
  name: string;
  version: string;
}

export type Exports = Map<string, SwaggerProperty>;

export interface ExportMap {
  filename: string;
  exports: Exports;
}

export interface ProgramOptions extends CommandOptions {
  file: string;
  export?: string;
  write?: string;
}
