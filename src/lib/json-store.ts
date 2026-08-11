import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

const locks = new Map<string, Promise<void>>();

export function dataPath(filename: string) {
  const directory = process.env.DATA_DIR
    ? path.resolve(process.env.DATA_DIR)
    : path.join(process.cwd(), "data");
  return path.join(directory, filename);
}

export async function readJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await readFile(dataPath(filename), "utf8")) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return fallback;
    throw error;
  }
}

async function writeJsonNow<T>(filename: string, value: T) {
  const target = dataPath(filename);
  await mkdir(path.dirname(target), { recursive: true });
  const temporary = `${target}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await rename(temporary, target);
}

export async function updateJson<T>(
  filename: string,
  fallback: T,
  updater: (value: T) => T | Promise<T>,
): Promise<T> {
  const previous = locks.get(filename) ?? Promise.resolve();
  let result!: T;
  const current = previous.then(async () => {
    result = await updater(await readJson(filename, fallback));
    await writeJsonNow(filename, result);
  });
  locks.set(filename, current.catch(() => undefined));
  await current;
  return result;
}
