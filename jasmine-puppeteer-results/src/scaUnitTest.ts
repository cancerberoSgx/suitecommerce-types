import { ChildProcess } from "child_process";
import { config as shellConfig, exec } from "shelljs";
import { AbstractConfig, getJasmineHtmlResults, JasmineResult } from "./jasmineHtml";

// tools for execute sca's gulp unit-test command and wait till is ready so we can execute jasmineHtml tools


export interface ScaUnitTestResult {
  /** invoke this to quit the gulp unit-test process */
  kill: () => void
  /** get a promise to know when gulp unit-test command is ready and the page with unit tests is listening (so we can execute jasmineHtml tools) */
  onReady: () => Promise<string>
}
export interface ScaUnitTestConfig extends AbstractConfig{
  /** path to the SCA workspace */
  path: string
  /** module names to execute unit tests for*/
  modules: string[]
  onStderr?: (url: string) => void
  onStdout?: (url: string) => void
  onExit?: () => void
  onError?: () => void
  /** by default we exec killall gulp command so we make sure it will work */
  dontKillAllGulp?: boolean
  // debug?: boolean
}

// export class PromiseEmitter
export async function execGulpUnitTest(config: ScaUnitTestConfig): Promise<ScaUnitTestResult> {
  
  !config.debug && (shellConfig.silent = true)

  if(!config.dontKillAllGulp){
    const p = exec('killall gulp')
    config.debug && console.log(`execGulpUnitTest: killall gulp exeit with ${p.code}` );
  }

  const cmd = `npx gulp unit-test --modules ${config.modules.join(',')} --dont-exit`

  config.debug && console.log('execGulpUnitTest: executing command' + cmd);

  const p = exec(cmd, { async: true, cwd: config.path }) as ChildProcess

  let onReadyResolve: (url: string) => void

  p.stdout.on('data', data => {
    data = (data||'').trim()
    config.debug && console.log('execGulpUnitTest: STDOUT', data);
    config.onStdout && config.onStdout(data)
    const lines = data.split('\n').filter(l => l) as string[]
    const ready = lines.find(l => l.includes('Local http server available at:'))
    if (ready) {
      const url = ready.split('Local http server available at:')[1].trim()
      onReadyResolve(url)
    }
  })
  p.stderr.on('data', data => {
    data = (data||'').trim()
    config.onStderr && config.onStderr(data)
    config.debug && console.log('execGulpUnitTest: STDERR', data);
  })
  p.on('close', () => {
    config.debug && console.log('execGulpUnitTest: close');
    config.onExit && config.onExit()
    process.exit(0)
  })
  p.on('exit', () => {
    config.debug && console.log('execGulpUnitTest: exit');
    config.onExit && config.onExit()
    process.exit(0)
  })
  p.on('error', error => {
    config.onError && config.onError()
    config.debug && console.error('ERROR');
    process.exit(1)
  })
  return {
    onReady: async () => new Promise(resolve => { onReadyResolve = resolve }),
    kill(signal = 0) {
      config.debug && console.log('execGulpUnitTest: killing')
      p.kill(signal)
    }
  }
}

export async function execUnitTest(config: ScaUnitTestConfig): Promise<JasmineResult> {
  config.debug && console.log(`starting execGulpUnitTest on ${config.path} and modules ${config.modules.join(',')}`)
  const p = await execGulpUnitTest({...config, 
    path: '/home/sg/awa/kilimanjaro',
    modules: ['SCTypesFrontEndCoreSCAUnitTest']
  })
  const address = await p.onReady()
  const url = address + 'test1.html'
  config.debug && console.log(`starting getJasmineHtmlResults, url: ${url}`);
  const result = await getJasmineHtmlResults({ ...config, jasmineHtmlServerUrl: url })
  p.kill()
  return result
}
