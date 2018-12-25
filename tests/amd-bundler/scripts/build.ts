import { ls, cat, config, rm } from "shelljs";
import { readFileSync, writeFileSync } from "fs";

config.silent = true


function append(input, output) {
    writeFileSync(output, `
${readFileSync(output).toString()}
${readFileSync(`${__dirname}/${input}`).toString()}\n\n`)

}

export interface BuildConfig {
    outputFile: string
    inputFolder: string //TODO should be glob
    require
}

export function build(config: BuildConfig) {

    const outputFile = `${__dirname}/bundle.js`

    writeFileSync(outputFile, '')
    append(`almond.js`, outputFile)
    ls(`${__dirname}/src`).forEach(f => {

        append(`src/${f}`, outputFile)

    })
}