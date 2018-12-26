
import *  as Backbone from 'backbone'

export class BackboneModel extends Backbone.Model {

}

export class BackboneCachedModel extends BackboneModel {
  isCached(params: any[] | JQuery.PlainObject | JQuery): boolean {
    throw new Error("Method not implemented.");
  }

  addToCache(data: any, params: any[] | JQuery.PlainObject | JQuery): void {
    throw new Error("Method not implemented.");
  }
}