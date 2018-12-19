import *  as Backbone from 'backbone'

export type ModelAttributes = {[name:string]:any} 

export class BackboneModel<Attributes extends ModelAttributes = ModelAttributes> extends Backbone.Model {
  validation?: {[propertyName: string]: BackboneModelValidation}
  attributes: Attributes = {} as Attributes
  // set(a: ModelAttributes|string, b?: any|Backbone.ModelSetOptions): BackboneModel<Attributes> {
  //   return super.set(a, b)
  // }
  constructor(attributes?: Attributes, options?: any){
    super(attributes, options)
  }
}

export interface BackboneModelValidation {
  required?: boolean
	// pattern?: string
  msg?: string
  fn?: (...args: any[])=> boolean
  acceptance?:boolean
  min?: number
  max?: number
  range?: number[]
  length?:number
  minLength?:number
  maxLength?:number
  rangeLength?:number[]
  oneOf? : string[]
  equalTo?: string
  pattern?: string|RegExp
}

export enum BackboneModelValidationPatterns {
  digits='digits',
  number='number',
  email='email',
  netsuiteEmail='netsuiteEmail',
  url='url'
}

export class BackboneCachedModel<A> extends BackboneModel<A> {
  isCached(params: any[] | JQuery.PlainObject | JQuery): boolean {
    throw new Error("Method not implemented.");
  }

  addToCache(data: any, params: any[] | JQuery.PlainObject | JQuery): void {
    throw new Error("Method not implemented.");
  }
}