import { Fn } from "..";
// import { Collection } from "./Collection";
// import { Model } from "./Model";

// export type TemplateContextValue = number|boolean|string|((number|boolean|string)[]) |((number|boolean|string)[][]) |((number|boolean|string)[][][])

// export type TemplateContext= {[name: string]: TemplateContextValue}

export type TemplateContext= {}
export type Template<Context=TemplateContext> = Fn<string, [Context]>
/**
 * Subset of SuiteCommerce View exposed for Extensions developers for declaring new views, adding child-views, etc.
 *
 * Internally is implemented with `Backbone.View` which is enhanced with handlebars templates, render plugins, context,
 * SEO, composition, navigation, etc.
 *
 * See {@tutorial frontend_defining_new_views}
 *
 * @class
 */
export interface View<Context extends TemplateContext = TemplateContext>{
	/**
	 * The template for this view, in general a function that accepts this view context object and returns an HTML string.
	 * If it is a string an AMD module with that name is tried to be loaded.
	 * If it is undefined the view will be rendered without errors as an empty string
	 */
	template: Template<Context>

	// /**
	//  *
	//  */
	// events?: { [selector: string]: (string | Fn) }

	/**
	 * 
	 */
	bindings?: { [selector: string]: (string | Fn) }

	// model?:Model

	// collection?: Collection
	
	// /**
	//  * this is executed when a new view is instantiated - equivalent to the instance contructor.
	//  */
	// initialize?(...options: any[]): void

	// render(): void
	_render(): void

	/**
	 * Returns the object which will be consumed by this view's template
	 */
	getContext(): Context

	/**
	 * 
	 */
	destroy(): void
}

// export interface ViewConstructor<V extends View> {
// 	 new (...any: any[]): V
// 	 extend<V2 extends V=V>(def:Partial<View>|Partial<V2>):ViewConstructor<V2>
// }
// export class BackboneView<V extends View> {
// 	//  new (...any: any[]): V
// 	 static extend<V2 extends V=V>(def:any):BackboneView<V2> {
     
//     throw new Error("Method not implemented.");
//    }
// }

// import *  as Backbone from 'backbone'
// bb.View
export class BackboneView<VModel extends Backbone.Model=Backbone.Model, Context extends TemplateContext = TemplateContext> extends Backbone.View<VModel> implements View<Context> {
  template: Template<Context>;  
  // events?;
  bindings?;
  // model?:Model;
  // collection?: Collection;
  // initialize?(...options: any[]): void {
  //   throw new Error("Method not implemented.");
  // }
  // render(): void {
  //   throw new Error("Method not implemented.");
  // }
  _render(): void {
    throw new Error("Method not implemented.");
  }
  getContext(): Context {
    throw new Error("Method not implemented.");
  }
  destroy(): void {
    throw new Error("Method not implemented.");
  }
  // static extend<V extends View>(def:any):typeof BackboneView&V {
  //   throw new Error("Method not implemented.");
  // }
  // constructor(...args: any[]){
  //   throw new Error("Method not implemented.");
  // }
}

// export type CCC = typeof BackboneView

import *  as Backbone from 'backbone'
// Backbone.View.extend
// 