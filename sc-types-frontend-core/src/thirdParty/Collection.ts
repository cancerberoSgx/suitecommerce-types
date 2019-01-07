import * as Backbone from 'backbone'
import { BackboneModel } from './Model'

export class BackboneCollection<M extends BackboneModel = BackboneModel> extends Backbone.Collection<M> {

}

export class BackboneCachedCollection<M extends BackboneModel = BackboneModel> extends BackboneCollection<M> {

  isCached(params: any[] | JQuery.PlainObject | JQuery): boolean {
    throw new Error("Method not implemented.")
  }

  addToCache(data: any, params: any[] | JQuery.PlainObject | JQuery): void {
    throw new Error("Method not implemented.")
  }
}