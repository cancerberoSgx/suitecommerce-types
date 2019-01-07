import * as Backbone from 'backbone';
import { Fn, PluginContainer } from "..";
import { BackboneModel } from './Model';
// import { PluginContainer } from 'plugin-container'
import { TODOFn, TODO } from '../types';
import { Deferred } from './Deferred';

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

  
  /** triggered after a view is rendered */
  on(name: 'afterViewRender', handler: (view: BackboneView)=> void): void
  /** triggered when a view's children finish rendering in the DOM */
  on(name: 'afterCompositeViewRender', handler: (view: BackboneView)=> void): void
}

export interface BackboneViewOptions<M extends BackboneModel> extends Backbone.ViewOptions<M> {

}

export class BackboneView<VModel extends Backbone.Model=BackboneModel, Context extends TemplateContext = TemplateContext> extends Backbone.View<VModel> implements View<Context> {
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

  /** instance plugin container that can act on the jquery document fragment just before it's appended to this.$el. */
  preRenderPlugins?: PluginContainer<JQuery<HTMLElement>, [BackboneView]>

  /** afterCompositeViewRender Plugins registered here will be called when. A composite view finish rendering it self and all its children.. TODO: PluginContainer generics*/
  static afterCompositeViewRender: PluginContainer<TODO, TODO>

  /**preCompile These hooks are executed before the template function is executed and generates a HTML string. Each execute method of each plugin will receive: the template function, the view and the context where the template will execute.. TODO: PluginContainer generics */
  static preCompile: PluginContainer<TODO, TODO>

  /**postCompile These hooks are executed after the template the template function is executed and generates a HTML string. Each execute method of each plugin will receive: the template string (result of having running the template) and the view. . TODO: PluginContainer generics
 */
  static postCompile: PluginContainer<TODO, TODO>

	/** preRender These hooks are executed before the template result is appended to DOM
. Each execute method of each plugin will receive: the template  DOM object (without begin insert into the DOM) and the view. . TODO: PluginContainer generics
  */
  static preRender: PluginContainer<JQuery<HTMLElement>, [BackboneView]>

  /**postRender These hooks are executed after the template is appended to DOM
  Each execute method of each plugin will receive: the template DOM object (already in the DOM) and the view.. TODO: PluginContainer generics
   */
  static postRender: PluginContainer<JQuery<HTMLElement>, [BackboneView]>

  /**notifies when any view is about to be called its initialize() method . TODO: PluginContainer generics*/
  static beforeInitialize: PluginContainer<TODO, TODO>

  /**notifies when any view was called its initialize() method . TODO: PluginContainer generics*/
  static afterInitialize: PluginContainer<TODO, TODO>


  cid: string

  
  // @property {String} errorMessage Default error message, usally overwritten by server response on error
  errorMessage: string

  // @method showContent @param {Boolean} dont_scroll will eventually be changed to an object literal
  // @return {jQuery.Deferred}
  showContent(dont_scroll){

  }
  
  // @method showInModal @param {Object} options @return {jQuery.Deferred}
	showInModal(options){

  }

  // @method showInPush @param {Object} options @return {jQuery.Deferred}
	showInPush(options){

  }

  // @method getMetaDescription Get view's SEO attributes @return {String}
	getMetaDescription(): string{

  }

  // @method getMetaKeywords @return {String}
	getMetaKeywords(): string{
    
  }
  {
    return this.metaKeywords;
  }

  // @method getAddToHead @return {String}
	getAddToHead()
  {
    return this.addToHead;
  }

  // @method getMetaTags @return {Array<HTMLElement>}
	getMetaTags()
  {
    return jQuery('<head/>').html(this.metaTags || '').children('meta');
  }

  //@method getTitle @returns {String} the document's title to show when this view is active.
	getTitle()
  {
    // @property {String} title this view title. The default behavior is to set the document's title using view.title when calling view.showContent()
    return this.title;
  }

  // @method getPageDescription returns a text describing the page this view is implemented in the case is rendered as a main view with Layout.showContent()
	getPageDescription()
  {
    return this.attributes ? (this.attributes.id || this.attributes['class'] || '') : '';
  }

  //@method getCanonical @return {String}
	getCanonical()
  {
    var canonical = window.location.protocol + '//' + window.location.hostname + '/' + Backbone.history.fragment
    ,	index_of_query = canonical.indexOf('?');

    // !~ means: indexOf == -1
    return !~index_of_query ? canonical : canonical.substring(0, index_of_query);
  }

  // @method getRelPrev For paginated pages, subclasses should implement this operations to return the url of the previous and next pages
	getRelPrev: jQuery.noop

  // @method getRelNext For paginated pages, subclasses should implement this operations to return the url of the previous and next pages
	getRelNext: jQuery.noop

  // @method _destroy "private", shouldn't be overwritten if a custom destroy method is required override the destroy method. This method should still be called
  // @param {Boolean} softDestroy decides if the view should be empty instead of removed
	_destroy()
  {

  }

  // @method destroy
	destroy(softDestroy)
  {
    this._destroy(softDestroy);
  }

  // @method showConfirmationMessage @param {String} message
	showConfirmationMessage(message, fixed: boolean)
  {
    var confirmation_message = this.$('[data-confirm-message]')
    ,	global_view_message = new GlobalViewsMessageView({
        message: message
      ,	type: 'success'
      ,	closable: true
    });

    confirmation_message.html(global_view_message.render().$el.html());

    if (!fixed)
    {
      setTimeout(function()
      {
        confirmation_message.fadeOut(3000);
      }, 5000);
    }
  }

  // @method showWarningMessage @param {String} message
	showWarningMessage(message)
  // @method disableElementsOnPromise Disables and re-enables a given set of elements based on a promise
  // @param {jQuery.Deferred} promise @param {String} selector
	disableElementsOnPromise(promise, selector)

// ,	getContext: function()


// },	SCCancelableEvents);

  //@method addExtraEventHandler Adds an extra event handler to the current view
  //@param {String} event_selector Event specification to be added into the list of event handled by the current view
  //@param {Function} callback Function that will be called when the specified event is triggered
  //@return {Void}
  //@static
  //@public
addExtraEventHandler: function addExtraEventHandler (event_selector, callback)

  //@method removeExtraEventHandler Removes an extra event handler of the current view
  //@param {String} event_selector Event specification to be added into the list of event handled by the current view
  //@return {Void}
  //@static
  //@public
  static removeExtraEventHandler(event_selector: string): void{

  }




  /**
   Add childViews to this View
   @param {child_views} The view to be added
   @param  render Indicates if the childViews needs to be rendered
 */
  addChildViewInstances(child_views: TODO, render: boolean): void {
    throw new Error("Method not implemented.");
  }

  /**
  Returns an Array of all the childViews instances
  @param  container_name The name of the container (Optional)
  */
  getChildViewInstances(container_name?: string): BackboneView[] {
    throw new Error("Method not implemented.");
  }

  getChildViewInstance(childViewName: string): BackboneView|undefined {
    throw new Error("Method not implemented.");
  }

  setChildViewIndex(container_name: string, view_name: string, index: number, render: boolean): Deferred {
    throw new Error("Method not implemented.");
  }

  contextData: {[contextName: string]: any}

  getContextData(contextNames: string[]): {[contextName: string]: any}{
    throw new Error("Method not implemented.");
  }

  /**
 updates the render settings or the selector
 @param {String} selector Where the child view will be inserted
 @param {Backbone.View} child_instance Child View to be added
 @param {Backbone.CompositeView.AddChildView.Settings} render_settings Indicate how the insertion must be done. Information like where the child view will be placed
 @return {Void}
  */
  updateChildViewInstances(child_views: BackboneView[], render: TODO): void {
    throw new Error("Method not implemented.");
  }


  /**
 Removes a child view instance from the current view. Optionally destroy the child view
 @param {Backbone.View} child_instance Instance to be removed
 @param {Boolean} destroy Indicate if the child view will be also destroyed.
  */
  removeChildViewInstance(container_name: string, child_view_name: string, destroy: boolean): Deferred {
    throw new Error("Method not implemented.");
  }


  /**  Allows adding an extra context property into a view.
   @param property_name Unique name of the extra property to be added
   @param type Name of the type of the new property
   @param {Function} callback Function invoked each time the View's UI context is being generated
   */
  static addExtraContextProperty(property_name: string, type: string, callback: TODOFn): void {
    throw new Error("Method not implemented.");
  }


  /** Removes a previously extra context property
   @param property_name Name of the property */
  static removeExtraContextProperty(property_name: string): void {
    throw new Error("Method not implemented.");
  }

  /** adds children views to the current view. 
   * 
   This class define the type used to add external children views into a view by specifying them on the view options when
  creating a new composite view (this is a common scenario when creating components), and by specifying external child views statically using
  the addChildViews method present in all Backbone Views when the Backbone.CompositeView module is loaded
  Example
  
  ```
    SomeView.addChildViews({
      'ChildViewContainer':
      {
        'ChildViewName': function()
        {
          return new ExtraChildView({model: some_view_model});
        };
      }
    });
  ```
  */
  static addChildViews(child_views: ChildViewsDefinition): TODO {
    throw new Error("Method not implemented.");
  }



  // 	// Allows to change the position of a Child View in a container
  // 	// @param {String} container_name The name of the container
  // 	// @param {String} view_name The name of the Child View
  // 	// @param {Number} index The new index to position the Child View in the container
  // 	// @return {Void}
  // 	// @static
  // 	Backbone.View.setChildViewIndex = function setChildViewIndex (container_name, view_name, index)


  // 	// removes a particular childView
  // 	// @param {String} container_name
  // 	// @param {String} child_view_name
  // 	// @return {Void}
  // 	// @static
  // 	Backbone.View.removeChildView = function removeChildView (container_name, child_view_name)

}




export type ChildViewDefinition = {
  childViewIndex?: number
  childViewConstructor: ChildViewConstructor
}


export type ChildViewConstructor<V extends BackboneView = BackboneView> = Fn<V, any[]>|typeof BackboneView


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
export declare type ChildViewsDefinition = { [containerName: string]: { [id: string]: ChildViewDefinition } }

export type TemplateContext = {}

export type Template<Context=TemplateContext> = Fn<string, [Context]>& {Name: string}
