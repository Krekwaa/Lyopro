import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(path);
  }

  return files;
}

const ukrainianOutput = join(process.cwd(), "out", "ua");

for (const file of await htmlFiles(ukrainianOutput)) {
  const source = await readFile(file, "utf8");
  const localized = source.replace('<html lang="en"', '<html lang="uk"');
  await writeFile(file, localized, "utf8");
}
