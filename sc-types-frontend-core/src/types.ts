/** typed function  */
export type Fn<Return=any,Arguments extends any[]=[]> = (...args:Arguments)=>Return