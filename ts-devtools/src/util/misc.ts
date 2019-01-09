import { join, sep, resolve } from "path";

export function getNodeModulesFolderPath(): string {
  const inDist = join(__dirname, '..').endsWith(`dist${sep}src`)
  const result = join(__dirname, '..', '..', inDist ? '..' : '.', 'node_modules')
  return result
}

export function getPathRelativeToProjectFolder(s: string): string {
  return resolve(join(getNodeModulesFolderPath(), '..', s))
}

export function shorter(text: string, much: number = 10): string {
  return text.trim().substring(0, Math.min(text.length, much)) + '...'
}

export function quote(s:string, q:string='"'):string {
  return q+s.replace(new RegExp(q, 'g'), '\\'+q)+q
}