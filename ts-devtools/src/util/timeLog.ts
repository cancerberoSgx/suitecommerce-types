// import {now} from 'hrtime-now'
function now() {
  return Date.now()
}
type Times = { [k: string]: Time }
type Name = 'compileAndFix' | 'fixProjectErrors' | 'import2define' | 'import2defineOne' | 'compileTsProject' | 'addTslibAmdDependency' | 'linkInputProjectFiles' | 'import2defineCompileAndFix'|'import2defineProject'

const times: Times = {}

interface Time {
  t: number
  count: number
  current: number
  errors: string[]
  name: string
}
export function time(name: Name) {
  if (!times[name]) {
    times[name] = {
      t: 0,
      count: 0,
      errors: [],
      current: -1,
      name
    }
  }
  const time = times[name]
  time.count++
  if (time.current !== -1) {
    time.errors.push('time() called when previous one still running. resetting')
  }
  time.current = now()
}

export function timeEnd(name: Name): any {
  if (!times[name]) {
    times[name] = {
      t: 0,
      count: 0,
      errors: ['timeEnd() called before any previous time()'],
      current: -1,
      name
    }
  }
  const time = times[name]
  time.count++
  if (time.current === -1) {
    time.errors.push('timeEnd() called before a previous time()')
    return
  }
  time.t = time.t + now() - time.current
  time.current = -1
  return false
}

export function withTime<T>(name: Name, fn: (...args: any[]) => T): T {
  time(name)
  const result = fn()
  timeEnd(name)
  return result
}

export function getTimes(): Times {
  return times
}
const pretty = require('pretty-ms')
export function printTimes(): string[] {
  let t: string[] = Object.values(times)
    .sort((t1, t2) => t1.t > t2.t ? -1 : 1)
    .map(time => {
      return `${time.name}${new Array(40 - time.name.length).fill(0).map(e => '').join(' ')}t: ${pretty(time.t)}, count: ${time.count}, errors: ${time.errors.join(', ')||'[]'}`
    })
  return t
}