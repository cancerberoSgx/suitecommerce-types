import { Fn, PluginContainer } from ".."
import { BackboneModel } from './Model'
import { TODOFn, TODO } from '../types'
import { Deferred } from './Deferred'
import { TemplateContext, View, Template, BackboneViewBindings, ShowInModalOptions, ShowInPushOptions, ChildViewsDefinition } from './View'
import * as Backbone from 'backbone';

export class BackboneView<VModel extends Backbone.Model = BackboneModel, Context extends TemplateContext = TemplateContext> extends Backbone.View<VModel> implements View<VModel, Context> {

  template: Template<Context>|undefined

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
            BackboneFormView.add(this)
        }
  }
```
   */
  bindings?: BackboneViewBindings

  /**
   * Serialize the input of some form and save() the given model using it. 
   * 
   * You can bind this method to a form "submit" event. 
   * 
   * This method is implemented when calling BackboneFormView.add(aView) and using `bindings` property to 
   * declare the bindings - is not meant to be overridden or implemented by users.
   *  @param  props properties to pass to model.save()
   */
  saveForm?(event: Event, model: BackboneModel, props: any): Deferred

  // protected _render(): void {
  //   throw new Error("Method not implemented.")
  // }

  getContext(): Context {
    throw new Error("Method not implemented.")
  }

  /** instance plugin container that can act on the jquery document fragment just before it's appended to this.$el. */
  preRenderPlugins?: PluginContainer<JQuery<HTMLElement>, [BackboneView]>

  /** internal unique id for this view instance */
  cid!: string

  // @property {String} errorMessage Default error message, usually overwritten by server response on error
  errorMessage!: string

  /**
  @param dont_scroll preserve current scroll after showing the view
   */
  showContent(dont_scroll?: boolean): Deferred<void> {
    throw new Error("Method not implemented.")
  }

  /**@param options We trigger the plugin, it can be passed custom options
 http://twitter.github.com/bootstrap/javascript.html#modals*/
  showInModal(options: ShowInModalOptions): Deferred<void> {
    throw new Error("Method not implemented.")
  }

  showInPush(options: ShowInPushOptions): void {
    throw new Error("Method not implemented.")
  }

  /**  Shouldn't be overwritten if a custom destroy method is required override the destroy method. This method should /**till be called
    @param softDestroy decides if the view should be empty instead of removed
    */
  protected _destroy(softDestroy?: boolean): void {
    throw new Error("Method not implemented.")
  }

  /** calls backbone.view destroy method and also unregister SC private listeners
   * @param softDestroy decides if the view should be empty instead of removed
  */
  destroy(softDestroy?: boolean): void {
    throw new Error("Method not implemented.")
  }

  /**
   * @param fixed if not true the message will be hidden after a few seconds
   */
  showConfirmationMessage(message: string, fixed?: boolean): void {
    throw new Error("Method not implemented.")
  }

  showWarningMessage(message: string): void {
    throw new Error("Method not implemented.")
  }

  /**  Disables and re-enables a given set of elements based on a promise*/
  disableElementsOnPromise(promise: Deferred<any>, selector: string): void {
    throw new Error("Method not implemented.")
  }

  /**
   Add childViews to this View
   @param  The view to be added
   @param  render Indicates if the childViews needs to be rendered
 */
  addChildViewInstances(child_views: {
    [childViewName: string]: Fn<BackboneView, TODO>
  }
    , render?: boolean): void {
    throw new Error("Method not implemented.")
  }

  /**
  Returns an Array of all the childViews instances
  @param  container_name The name of the container (Optional)
  */
  getChildViewInstances(container_name?: string): BackboneView[] {
    throw new Error("Method not implemented.")
  }

  getChildViewInstance(childViewName: string): BackboneView | undefined {
    throw new Error("Method not implemented.")
  }

  setChildViewIndex(container_name: string, view_name: string, index: number, render: boolean): Deferred {
    throw new Error("Method not implemented.")
  }

  /** @returns the document's title to show when this view is active. The default behavior is setting document.title */
  getTitle(): string {
    throw new Error("Method not implemented.")
  }

  /**  title this view title. The default behavior is to set the document's title using view.title when calling view.showContent() */
  title: string|undefined
  /** returns a text describing the page this view is implemented in the case is rendered as a main view with Layout.showContent()*/
  getPageDescription(): string {
    throw new Error("Method not implemented.")
  }

  getCanonical(): string {
    throw new Error("Method not implemented.")
  }


  contextData: {
    [contextName: string]: any
  }|undefined


  getContextData(contextNames: string[]): {
    [contextName: string]: any
  } {
    throw new Error("Method not implemented.")
  }


  /**
 updates the render settings or the selector
 @param selector Where the child view will be inserted
 @param  child_instance Child View to be added
 @param  render_settings Indicate how the insertion must be done. Information like where the child view will be placed
  */
  updateChildViewInstances(child_views: BackboneView[], render: TODO): void {
    throw new Error("Method not implemented.")
  }

  /**
 Removes a child view instance from the current view. Optionally destroy the child view
 @param   child_instance Instance to be removed
 @param  destroy Indicate if the child view will be also destroyed.
  */
  removeChildViewInstance(container_name: string, child_view_name: string, destroy: boolean): Deferred {
    throw new Error("Method not implemented.")
  }

  /** Get view's SEO attributes */
  getMetaDescription(): string {
    throw new Error("Method not implemented.")
  }

  getMetaKeywords(): string {
    throw new Error("Method not implemented.")
  }

  getAddToHead(): string {
    throw new Error("Method not implemented.")
  }

  getMetaTags(): JQuery<HTMLMetaElement> {
    throw new Error("Method not implemented.")
  }

  /**For paginated pages, subclasses should implement this operations to return the url of the previous and next pages */
  getRelPrev(): string {
    throw new Error("Method not implemented.")
  }

  /** For paginated pages, subclasses should implement this operations to return the url of the previous and next pages*/
  getRelNext(): string {
    throw new Error("Method not implemented.")
  }

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
  /**  Allows adding an extra context property into a view.
   @param property_name Unique name of the extra property to be added
   @param type Name of the type of the new property
   @param   callback Function invoked each time the View's UI context is being generated
   */
  static addExtraContextProperty(property_name: string, type: string, callback: TODOFn): void {
    throw new Error("Method not implemented.")
  }

  /** Removes a previously extra context property
   @param property_name Name of the property */
  static removeExtraContextProperty(property_name: string): void {
    throw new Error("Method not implemented.")
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
          return new ExtraChildView({model: some_view_model})
        }
      }
    })
  ```
  */
  static addChildViews(child_views: ChildViewsDefinition): TODO {
    throw new Error("Method not implemented.")
  }
  /**Adds an extra event handler to the current view
  @param event_selector Event specification to be added into the list of event handled by the current view
  @param callback Function that will be called when the specified event is triggered
 
  */
  static addExtraEventHandler(event_selector: string, callback: Fn): void {
    throw new Error("Method not implemented.")
  }
  /**Removes an extra event handler of the current view
  @param event_selector Event specification to be added into the list of event handled by the current view*/
  static removeExtraEventHandler(event_selector: string): void {
    throw new Error("Method not implemented.")
  }
  /**
    Validates is the passed in selector follows the format/standard required by SC Views and used to validate in addExtraEventHandler and removeExtraEventHandler. can be overriden to change this behavior.
    
    format: '<event_name> [data=action="<event_handlerName>"]'
    
    @param  event_selector Selector to be validates
     */
  protected static _isEventSelectorValid(event_selector: string): boolean {
    throw new Error("Method not implemented.")
  }
}
