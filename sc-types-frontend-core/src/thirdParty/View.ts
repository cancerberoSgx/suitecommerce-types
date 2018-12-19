import * as Backbone from 'backbone';
import { Fn, PluginContainer } from "..";
import { BackboneModel } from './Model';
import { TODO } from '../types';
import { Deferred } from './Deferred';
import { BackboneView } from './BackboneView';

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
export interface View<Model extends Backbone.Model = BackboneModel, Context extends TemplateContext = TemplateContext> extends Backbone.View<Model> {
	/**
	 * The template for this view, in general a function that accepts this view context object and returns an HTML string.
	 * If it is a string an AMD module with that name is tried to be loaded.
	 * If it is undefined the view will be rendered without errors as an empty string
	 */
  template: Template<Context>

  /** Declaration of double binding between DOM input els with this.model attributes. 
   * 
   * To be Used with BackboneFormView.add() which will add the saveForm() method after the call. Example: 
   * 
```
class MyFormView extends BackboneView {
		events = <any>{
      // using saveForm method (automatically implemented) to call model.save() when form submitted 
			'submit form': 'saveForm'
		}

    // binds DOM input els with this.model properties
	bindings= {
			'[name="firstname"]': 'firstname'
		,	'[name="lastname"]': 'lastname'
		,	'[name="companyname"]': 'companyname'
		,	'[name="phone"]': 'phone'
		}

		initialize(){
      super.initialize()
      // important, the following call will implement saveForm() method and bind DOM with model
			BackboneFormView.add(this);
		}
  }
```
   */
  bindings?: BackboneViewBindings


	/**
   * serialize the input of some form and save() the given model using it. you can bind this method to a form "submit" event. This method is implemented when calling BackboneFormView.add(aView) and using `bindings` property to declare the bindings - is not meant to be overridden or implemented by users. 
   *  @param  props properties to pass to model.save()
*/
  saveForm?(event: Event, model: BackboneModel, props: any): Deferred

	/**
	 * Returns the object which will be consumed by this view's template
	 */
  getContext(): Context


  /** triggered after a view is rendered */
  on(name: 'afterViewRender', handler?: (view: BackboneView) => any, context?: this): any
  /** triggered when a view's children finish rendering in the DOM */
  on(name: 'afterCompositeViewRender', handler?: (view: BackboneView) => any, context?: this): any
  on(eventName: string, callback?: (...args: any[]) => void, context?: any): any;
  on(eventMap: Backbone.EventsHash): any;


  /** internal unique id for this view instance */
  cid: string

  /** Default error message, usually overwritten by server response on error */
  errorMessage: string

  /**
  @param dont_scroll preserve current scroll after showing the view 
   */
  showContent(dont_scroll?: boolean): Deferred<void>

  /**@param options We trigger the plugin, it can be passed custom options
 http://twitter.github.com/bootstrap/javascript.html#modals*/
  showInModal(options: ShowInModalOptions): Deferred<void>

  showInPush(options: ShowInPushOptions): void

  /** Get view's SEO attributes */
  getMetaDescription(): string

  getMetaKeywords(): string

  getAddToHead(): string

  getMetaTags(): JQuery<HTMLMetaElement>


  /** @returns the document's title to show when this view is active. */
  getTitle(): string

  /**  title this view title. The default behavior is to set the document's title using view.title when calling view.showContent() */
  title: string

  /** returns a text describing the page this view is implemented in the case is rendered as a main view with Layout.showContent()*/
  getPageDescription(): string

  getCanonical(): string

  /**For paginated pages, subclasses should implement this operations to return the url of the previous and next pages */
  getRelPrev(): string

  /** For paginated pages, subclasses should implement this operations to return the url of the previous and next pages*/
  getRelNext(): string

  /** calls backbone.view destroy method and also unregister SC private listeners 
   * @param softDestroy decides if the view should be empty instead of removed
  */
  destroy(softDestroy?: boolean): void

  /**
   * @param fixed if not true the message will be hidden after a few seconds
   */
  showConfirmationMessage(message: string, fixed?: boolean): void

  showWarningMessage(message: string): void

  /**  Disables and re-enables a given set of elements based on a promise*/
  disableElementsOnPromise(promise: Deferred<any>, selector: string): void

  /** instance plugin container that can act on the jquery document fragment just before it's appended to this.$el. */
  preRenderPlugins?: PluginContainer<JQuery<HTMLElement>, [BackboneView]>

  /**
   Add childViews to this View
   @param  The view to be added
   @param  render Indicates if the childViews needs to be rendered
 */
  addChildViewInstances(child_views: { [childViewName: string]: Fn<BackboneView, TODO> }, render?: boolean): void

  /**
  Returns an Array of all the childViews instances
  @param  container_name The name of the container (Optional)
  */
  getChildViewInstances(container_name?: string): BackboneView[]

  getChildViewInstance(childViewName: string): BackboneView | undefined

  setChildViewIndex(container_name: string, view_name: string, index: number, render: boolean): Deferred
  contextData: { [contextName: string]: any }

  getContextData(contextNames: string[]): { [contextName: string]: any }
  /**
  updates the render settings or the selector
  @param selector Where the child view will be inserted
  @param  child_instance Child View to be added
  @param  render_settings Indicate how the insertion must be done. Information like where the child view will be placed
  */
  updateChildViewInstances(child_views: BackboneView[], render: TODO): void

  /**
  Removes a child view instance from the current view. Optionally destroy the child view
  @param   child_instance Instance to be removed
  @param  destroy Indicate if the child view will be also destroyed.
  */
  removeChildViewInstance(container_name: string, child_view_name: string, destroy: boolean): Deferred

  
  /**
  @param dont_scroll preserve current scroll after showing the view 
   */
  showContent(dont_scroll?: boolean): Deferred<void>

  /**@param options We trigger the plugin, it can be passed custom options
 http://twitter.github.com/bootstrap/javascript.html#modals*/
  showInModal(options: ShowInModalOptions): Deferred<void>

  showInPush(options: ShowInPushOptions): void

  /** calls backbone.view destroy method and also unregister SC private listeners 
   * @param softDestroy decides if the view should be empty instead of removed
  */
  destroy(softDestroy?: boolean): void

  /**
   * @param fixed if not true the message will be hidden after a few seconds
   */
  showConfirmationMessage(message: string, fixed?: boolean): void

  showWarningMessage(message: string): void

  /**  Disables and re-enables a given set of elements based on a promise*/
  disableElementsOnPromise(promise: Deferred<any>, selector: string): void


  /**
   Add childViews to this View
   @param  The view to be added
   @param  render Indicates if the childViews needs to be rendered
 */
  addChildViewInstances(child_views: { [childViewName: string]: Fn<BackboneView, TODO> }, render?: boolean): void

  /**
  Returns an Array of all the childViews instances
  @param  container_name The name of the container (Optional)
  */
  getChildViewInstances(container_name?: string): BackboneView[]

  getChildViewInstance(childViewName: string): BackboneView | undefined

  setChildViewIndex(container_name: string, view_name: string, index: number, render: boolean): Deferred  

  /** @returns the document's title to show when this view is active. The default behavior is setting document.title */
  getTitle(): string

  /** returns a text describing the page this view is implemented in the case is rendered as a main view with Layout.showContent()*/
  getPageDescription(): string

  getCanonical(): string

  // contextData: { [contextName: string]: any }

  getContextData(contextNames: string[]): { [contextName: string]: any } 

  /**
 updates the render settings or the selector
 @param selector Where the child view will be inserted
 @param  child_instance Child View to be added
 @param  render_settings Indicate how the insertion must be done. Information like where the child view will be placed
  */
  updateChildViewInstances(child_views: BackboneView[], render: TODO): void


  /**
 Removes a child view instance from the current view. Optionally destroy the child view
 @param   child_instance Instance to be removed
 @param  destroy Indicate if the child view will be also destroyed.
  */
  removeChildViewInstance(container_name: string, child_view_name: string, destroy: boolean): Deferred

  
}

export declare type ChildViewsDefinition = { [containerName: string]: { [id: string]: ChildViewDefinition } }

export type TemplateContext = {}

export type Template<Context=TemplateContext> = Fn<string, [Context]> & { Name?: string }

export interface ShowInModalOptions {
  modalOptions?: TODO
  className?: string
}
export interface ShowInPushOptions {
  no_destroy?: boolean
}



export type BackboneViewBindings = { [selector: string]: (string | Fn) }


export type ChildViewDefinition = {
  childViewIndex?: number
  childViewConstructor: ChildViewConstructor
}


export type ChildViewConstructor<V extends BackboneView = BackboneView> = Fn<V, any[]> | typeof BackboneView


/**
 * 
 *  Defines the type used on each childView property on composite views. Each property on this object will be related with a child view and the its value must a function that when evaluated returns the instance of a Backbone View, or the constructor of a Backbone.View


  examples: 
  ```
 		const childViews : ChildViewsDefinition= {
		'Other.View': {
			'Id1': {
				'childViewIndex': 10
			,	'childViewConstructor': function(){}
			}
			'Id2': {
				'childViewIndex': 20
			,	'childViewConstructor': function(){}
			}
		}
  }
  

  const childViews =  {
		'PromoCodeContainer':
		{
			'PromoCodeForm':
			{
				childViewIndex: 10
			,	childViewConstructor: function()
				{
					return new PromocodeFormView({});
				}
			}
		}
	}
```
 */

export interface BackboneViewOptions<M extends BackboneModel> extends Backbone.ViewOptions<M> {

}