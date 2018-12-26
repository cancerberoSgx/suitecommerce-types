/** typed function  */
export type Fn<Return=any,Arguments extends any[]=[]> = (...args:Arguments)=>Return

export type BackboneEventHandler = (...args: any[]) => void

export type TODO =any

export type TODOFn=Fn<TODO, TODO>