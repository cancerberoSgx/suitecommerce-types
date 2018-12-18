import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { ls, test, mkdir } from "shelljs";

export interface Config {
  targetFolder: string
  typeName: string
  outputFile: string
}

export function cssClassesToType(config: Config) {
  const c = extractAllSassClasses(config.targetFolder)
  const s = stringArrayToTsType(c, config.typeName)
  mkdir('-p', dirname(config.outputFile))
  writeFileSync(config.outputFile, s)
}
function stringArrayToTsType(a: string[], typeName: string): string {
  return `/** file automatically generated with css-classes-to-typescript */
export type ${typeName} = ${a.map(s => `'${s}'`).join(' | \n  ')}; `
}

function extractAllSassClasses(targetDistroFolder: string): string[] {
  const allClasses = ls('-R', targetDistroFolder).map(f => {
    var path = join(targetDistroFolder, f)
    if (!test('-f', path) || !path.endsWith('.scss')) {
      return
    }
    var text = readFileSync(path).toString()
    const classes = extractClasses(text)
    return classes
  }).filter(a => a && a.length)
  const result = flat(allClasses).filter((s, i, a) => s && a.indexOf(s) === i).sort()
  return result
};

function extractClasses(s: string) {
  const r = s.split('\n').map(l => {
    if (!l.trim().startsWith('.')) {
      return
    }
    const classes = l.split(',').filter(s => s.trim().startsWith('.')).map(s => s.substring(1, s.length).replace(/[^a-z0-9\-\_]/gim, '').trim())
    return classes
  }).filter(a => a && a.length)
  return flat(r).filter(s => s)
}

function flat<T>(arr: T[][]): T[] {
  return arr.length ? arr.reduce((a, b) => a.concat(b)) : []
}