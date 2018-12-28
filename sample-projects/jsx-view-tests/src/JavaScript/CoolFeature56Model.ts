import { BackboneModel, Deferred } from "sc-types-frontend";

export default class CoolFeature56Model extends BackboneModel{
  something() { }
  fetch(options: any):any{return jQuery.Deferred().resolve(2)}
}

// export interface ICoolFeature56Model {
//   something():void
//   fetch(options: any):Deferred<number>
// }