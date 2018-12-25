import * as Backbone from 'backbone';
import { Fn } from "..";

export type TemplateContext = {}
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
export interface View<Context extends TemplateContext = TemplateContext> {
	/**
	 * The template for this view, in general a function that accepts this view context object and returns an HTML string.
	 * If it is a string an AMD module with that name is tried to be loaded.
	 * If it is undefined the view will be rendered without errors as an empty string
	 */
  template: Template<Context>
	/**
	 * 
	 */
  bindings?: { [selector: string]: (string | Fn) }
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

export class BackboneView<VModel extends Backbone.Model=Backbone.Model, Context extends TemplateContext = TemplateContext> extends Backbone.View<VModel> implements View<Context> {
  template: Template<Context>;
	bindings?: { [selector: string]: (string | Fn) }
  _render(): void {
    throw new Error("Method not implemented.");
  }
  getContext(): Context {
    throw new Error("Method not implemented.");
  }
  destroy(): void {
    throw new Error("Method not implemented.");
  }
}