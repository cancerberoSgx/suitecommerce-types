import * as Backbone from 'backbone'
import { Application } from '../app';
export class BackboneRouter extends Backbone.Router {
  initialize(options?: Backbone.RouterOptions|Application){
    super.initialize(options as any)
  }
  application?: Application
}
