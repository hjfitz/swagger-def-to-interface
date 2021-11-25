import { Command } from "commander";
import CliController from "./cli.controller";
import CliService from "./cli.service";
import ModuleService from "./module.service";
import WriterService from "./writer.service";

import { getPackageMetadata } from "./util";
import { ProgramOptions } from "./types";

const { name, version } = getPackageMetadata();
const prog = new Command();

prog
  .name(name)
  .version(version)
  .option("-f, --file <filename>", "Which file generate types from")
  .option(
    "-e, --export <export-name>",
    "(optional) The export of the file to read. By default, this will generate types for every export"
  )
  .option(
    "-w, --write <dir>",
    "(optional) Where the resulting types should be written. If not specified, the contents will be printed to the screen"
  )
  .parse(process.argv);

const opts = prog.opts<ProgramOptions>();

const cliService = new CliService(prog, opts);

cliService.verifyInputsOrDie();

const { file, export: exportToParse, write } = opts;

const moduleService = new ModuleService(file, exportToParse); //, write);
const writerService = new WriterService(write);

const cliController = new CliController(
  cliService,
  moduleService,
  writerService
);

cliController.handle();
