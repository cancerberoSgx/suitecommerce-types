import * as BackboneLibrary from 'backbone'

export const Backbone : typeof BackboneLibrary = {
  history: BackboneLibrary.history,

  sync: BackboneLibrary.sync,

  ajax: BackboneLibrary.ajax,
  emulateHTTP: BackboneLibrary.emulateHTTP,

  emulateJSON: BackboneLibrary.emulateJSON,

  noConflict: BackboneLibrary.noConflict,

  $: BackboneLibrary.$,

  // View: typeof BackboneLibrary.View,
  // Events: typeof BackboneLibrary.Events,


} as typeof BackboneLibrary