// export interface Model{
//     get<T=any>(k:string):T
//     set<T=any>(k:string, v:T)
//     fetch(): Promise<this>
//     save(): Promise<this>
//     attributes:{[name:string]:any}
// }

// export interface ModelConstructor<M extends Model =Model>{
//     extend(def:Partial<M>):ModelConstructor<M>
// 	new <M2 extends Model =M>(...any):M2
// }

// export function BackboneModel<V extends Model=Model>(backboneObject): ModelConstructor<V>{
//     return backboneObject.Model
// }


export class BackboneModel extends Backbone.Model {
	// constructor (...any){}
  // attributes: { [name: string]: any; };
  // get<T = any>(k: string): T {
  //   throw new Error("Method not implemented.");
  // }  
  // set<T = any>(k: string, v: T) {
  //   throw new Error("Method not implemented.");
  // }
  // fetch(): Promise<this> {
  //   throw new Error("Method not implemented.");
  // }
  // save(): Promise<this> {
  //   throw new Error("Method not implemented.");
  // }
  // static extend(def: any):typeof BackboneModel.prototype{
  //   throw new Error("Method not implemented.");
  // }
}


import *  as Backbone from 'backbone'