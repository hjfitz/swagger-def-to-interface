import { SwaggerProperty } from "./swagger.types";
import { Exports } from "./types";

export default class ParserService {
  constructor(private readonly swaggerModules: Exports) {}

  private static toSubObject(
    name: string,
    attributes: string,
    indent: number
  ): string {
    return `${name}: {\t${attributes}\n${"\t".repeat(indent)}}\n`;
  }

  private static swaggerResponsetoType(
    name: string,
    type: SwaggerProperty,
    level = 1,
    isRoot = true
  ): string {
    const attributes = Object.entries(type)
      .map(([key, obj]) => {
        if (obj.type === "object" && obj.properties) {
          return ParserService.swaggerResponsetoType(
            key,
            obj.properties,
            level + 1,
            false
          );
        }
        const reqStr = obj?.required ? "" : "?";
        // outputs to key in interface. eg: `name: string`  or `name?: string`
        return `${key}${reqStr}: ${obj.type}`;
      })
      .map((el: string) => "\t".repeat(level) + `${el}`)
      .join("\n");

    if (isRoot) {
      let interfaceHeader = `interface ${name.replace(/Schema$/, "")} {`;
      return `${interfaceHeader}\n${attributes}\n}`;
    }

    return ParserService.toSubObject(name, attributes, level - 1);
  }

  parse() {
    const parsed = [...this.swaggerModules].map((mod) => {
      return ParserService.swaggerResponsetoType(mod[0], mod[1]);
    });

    return parsed;
  }
}
