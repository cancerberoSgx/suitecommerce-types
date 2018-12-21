import { join, sep, resolve } from "path";

// TOOD: Move to misc-node
export function getNodeModulesFolderPath(): string {
  const inDist = join(__dirname, '..').endsWith(`dist${sep}src`)
  const result = join(__dirname, '..', '..', inDist ? '..' : '.', 'node_modules')
  return result
}

export function getPathRelativeToProjectFolder(s: string): string {
  return resolve(join(getNodeModulesFolderPath(), '..', s))
}

