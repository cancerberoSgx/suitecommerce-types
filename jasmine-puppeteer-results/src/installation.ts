import { ls, test, ln } from "shelljs";
import { join, resolve } from 'path';

export function linkDependencies(fromWhere: string, to: string = './node_modules') {
  ls(fromWhere)
    .filter(f => {
      // console.log(f);
      return !test('-e', join(to, f)) && test('-e', join(fromWhere, f))
    })
    .forEach(f => {
      // console.log(join(fromWhere, f), resolve(join(to, f)));
      ln('-s', join(fromWhere, f), resolve(join(to, f)))
    })
}

export function isPInstalled(where: string='.') {
  return test('-e', 'node_modules/puppeteer')
}
