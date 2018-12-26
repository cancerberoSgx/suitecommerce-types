
import *  as Backbone from 'backbone'
import { BackboneModel, BackboneCachedModel } from './Model';

export class BackboneCollection<M extends BackboneModel> extends Backbone.Collection<M> {

}

export class BackboneCachedCollection extends BackboneCachedModel {
}