import { dirname } from "path";
import { cd, exec, tempdir, mkdir } from "shelljs";

export interface CompileAndFixConfig {
    /** assumes tsconfig.json file is in the root project path */
    tsconfigJsonPath: string
    /** if not given will use given tsconfig.json default dest */
    outputFolder?: string

    /**user can pass some custom config here . TODO*/
    tsConfig?: {
        target: 'es5' | 'es6' //TODO
    }
}
export interface CompileAndFixResult {
    errors: string[]
}

const forceTsConfig: { [name: string]: string | boolean } = {
    module: "commonjs",
    noEmitHelpers: true,
    importHelpers: true,
    listEmittedFiles: ''
}
export function compileAndFix(config: CompileAndFixConfig): CompileAndFixResult {
    // const auxDir=`${tempdir()}/ts-devtools-${new Date().getTime()}`
    // const auxDir=config.outputFolder
    mkdir('-p', config.outputFolder)
    cd(dirname(config.tsconfigJsonPath))
    const cmd = `npx tsc ${config.outputFolder ? `--outDir '${config.outputFolder}` : ``} ${Object.keys(forceTsConfig).map(name => `--${name} '${forceTsConfig[name] = ''}'`)}'`
    const p = exec(cmd)
    if (p.code !== 0) {
        return { errors: [`Executing command ${cmd} throwed error: stderr: ${p.stderr}`] }
    }
    const prefix = 'TSFILE: '
    const emittedFiles = p.stdout.split('\n').map(l => l.trim()).filter(l => l.startsWith(prefix)).map(l => l.substring(prefix.length, l.length))
    console.log(emittedFiles);

    return null

}

//TODO watcher