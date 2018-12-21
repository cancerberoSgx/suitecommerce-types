import { Fn } from "..";

/**
 * Subset of SuiteCommerce View exposed for Extensions developers for declaring new views, adding child-views, etc.
 *
 * Internally is implemented with ```Backbone.View``` which is enhanced with handlebars templates, render plugins, context,
 * SEO, composition, navigation, etc.
 *
 * See {@tutorial frontend_defining_new_views}
 *
 * @class
 */
export interface View<Context=any> {
	/**
	 * The template for this view, in general a function that accepts this view context object and returns an HTML string.
	 * If it is a string an AMD module with that name is tried to be loaded.
	 * If it is undefined the view will be rendered without errors as an empty string
	 * @type {Function|String}
	 */
	template: Fn

	/**
	 *
	 */
	events: { [selector: string]: (string | Fn) }

	/**
	 * 
	 */
	bindings: { [selector: string]: (string | Fn) }

	/**
	 * this is executed when a new view is instantiated - equivalent to the instance contructor.
	 * @param {...any} options
	 * @return {void}
	 */
	initialize(...options: any[]): void

	render(): void

	/**
	 * Returns the object which will be consumed by this view's template
	 * 
	 */
	getContext(): Context

	/**
	 * 
	 */
	destroy(): void
}

export interface ViewConstructor {
	extend(def: any): ViewConstructor
}