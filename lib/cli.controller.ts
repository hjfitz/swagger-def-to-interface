import CliService from "./cli.service";
import ParserService from "./parser.service";
import ModuleService from "./module.service";
import WriterService from "./writer.service";
import { ExportMap } from "./types";

export default class CliController {
  constructor(
    private readonly cliService: CliService,
    private readonly moduleService: ModuleService,
    private readonly writeService: WriterService
  ) {}

  public async handle() {
    console.log("Fetching exports");
    const exportMap: ExportMap = await this.moduleService.fetchExports();

    console.log("Parsing to types");
    const parserService = new ParserService(exportMap.exports);
    const parsedDefinitions = parserService.parse();

    this.writeService.write(parsedDefinitions[0]);

    const writeToDir = this.cliService.getModuleLocation();
  }
}
