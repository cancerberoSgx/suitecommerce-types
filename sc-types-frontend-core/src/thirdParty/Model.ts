
import *  as Backbone from 'backbone'

export class BackboneModel extends Backbone.Model {
  validation: {[propertyName: string]: BackboneModelValidation}
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

export class BackboneCachedModel extends BackboneModel {
  isCached(params: any[] | JQuery.PlainObject | JQuery): boolean {
    throw new Error("Method not implemented.");
  }

  addToCache(data: any, params: any[] | JQuery.PlainObject | JQuery): void {
    throw new Error("Method not implemented.");
  }
}