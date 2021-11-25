import { readFileSync } from "fs";
import { join, resolve } from "path";
import { PackageMetadata } from "./types";

function getDirname(): string {
  if (typeof __dirname === "undefined") {
    return new URL("", import.meta.url).pathname;
  }
  return __dirname;
}

export function getPackageMetadata(): PackageMetadata {
  const dirname = getDirname();
  const pkgLoc = resolve(dirname, "../../package.json");
  const pkgRaw = readFileSync(pkgLoc).toString();
  try {
    const { name, version } = JSON.parse(pkgRaw) as PackageMetadata &
      Record<string, unknown>;
    return { name, version };
  } catch (err) {
    return {
      name: "swagger-to-dts",
      version: "UNKNOWN",
    };
  }
}
