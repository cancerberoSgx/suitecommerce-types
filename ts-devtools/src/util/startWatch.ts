import { AllConfig, AllResult } from "./import2defineCompileAndFix";
import { watchFile, Stats, fstat, watch, unwatchFile, FSWatcher } from "fs";
import { debug } from "util";

export function startWatch(config: AllConfig & { filesToWatch: string[] }) {

  if (!config.watch) {
    return;
  }

  config.watchListener = config.watchListener || (() => { })

  config.watchListener({ event: 'beforeRegister' })
  if (config.debug) {
    console.log(`Watching: ${config.filesToWatch.join('\n')}`);
  }

  const watchers: FSWatcher[] = []
  config.filesToWatch.forEach(f => {
    config.watchListener({ event: 'registerFileWatch', fileName: f })
    
    const watcher = watch(f, { persistent: true }, (event: string, fileName: string) => {
      if (config.debug) {
        console.log(`File ${fileName} changed ${event}`);
      }
      const result: any = undefined // re-compile
      if (config.watchListener({ event: event as any, fileName, result })) {
        if (config.debug) {
          console.log(`Stop watching, config.watchListener return truth`);
        }
        watchers.forEach(w => w.close())
        config.watchListener({ event: 'stopWatching' })
      }
    })
    watchers.push(watcher)
  })
  config.watchListener({ event: 'afterRegister' })
}

export interface WatchEvent {
  fileName?: string,
  event: 'change' | 'error' | 'beforeRegister' | 'afterRegister' | 'stopWatching' | 'registerFileWatch'
  result?: AllResult
}