import { Fn } from "..";
import { Collection } from "./Collection";
import { Model } from "./Model";

export type Template<Context={}> = Fn<string, [Context]>
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
export interface View<Context, ModelOrCollection extends (Model|Collection) = Model> {
	/**
	 * The template for this view, in general a function that accepts this view context object and returns an HTML string.
	 * If it is a string an AMD module with that name is tried to be loaded.
	 * If it is undefined the view will be rendered without errors as an empty string
	 */
	template: Template<Context>

	/**
	 *
	 */
	events?: { [selector: string]: (string | Fn) }

	/**
	 * 
	 */
	bindings?: { [selector: string]: (string | Fn) }

	model?:ModelOrCollection

	collection?: ModelOrCollection
	
	/**
	 * this is executed when a new view is instantiated - equivalent to the instance contructor.
	 */
	initialize?(...options: any[]): void

	render(): void
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

// export interface ViewConstructor<V extends View=View> {
// 	prototype: V
// 	new<V2 extends View = V> (...any):V2
// 	extend(def: Partial<V>): ViewConstructor<V>
// 	// extend<V2 extends Partial<View> = V> (def: Partial<V2>): ViewConstructor<V2>
// }


// export interface ViewConstructor <V extends View=View> {
// 	// prototype: V
// 	new<V2 extends View=V> (...any):V2
// 	extend<V2 extends View=V>(def: Partial<V2>): ViewConstructor<V2>
// 	// extend<V2 extends Partial<View> = V> (def: Partial<V2>): ViewConstructor<V2>
// }


// export interface ViewConstructor{
// 	// prototype: V
// 	new<V2 extends View<unknown>> (...any):V2
// 	extend<V2 extends View<unknown>>(def: Partial<V2>): ViewConstructor
// }


export interface ViewConstructor {
    new <Context, ModelOrCollection extends (Model | Collection) = Model>(...any: any[]): View<Context, ModelOrCollection>;
    extend<Context, ModelOrCollection extends (Model | Collection) = Model>(def: Partial<View<Context, ModelOrCollection>>): ViewConstructor;
}

// export function BackboneView<V extends View=View>(backboneObject=(window as any).Backbone): ViewConstructor<V>{
//     return backboneObject.View
// }