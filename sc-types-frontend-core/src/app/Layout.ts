import { Deferred, Fn, View as View } from "..";
import { BackboneView } from "../thirdParty";

/**
 * The root view of the application. 
 * 
 * It is installed in a `container_element` HTML element that must exists in the HTML DOM (div `#main`).
 * 
 * Implement the concept of a `currentView`, this is at any time there is a MAIN view in which the use case implementation is shown.
 * 
 * When the user navigates through different parts the application the current view ({@link getCurrentView}) changes and the 
 * events {@link Layout#beforeAppendView} and {@link Layout#afterAppendView} are triggered. 
 * 
 * In general routers are responsible of the navigation by instantiating views and calling {@link showContent} or {@link showInModal}.
 * 
 * Managed by {@link Application} host.
 */
export interface Layout extends View {

  /**
   * Sets the current view
   */
  showContent(view: View, dont_scroll?: boolean): Deferred<void>
  showContent(dont_scroll?: boolean): Deferred<void>

  /**
   * Gets the current view.
   */
  getCurrentView(): View

  /**
   * Shows given view in a modal
   */
  showInModal(view: View, options?: any): Deferred<void>
  showInModal(options?: any): Deferred<void>

  /**
   * Closes the current opened modal, if any
   */
  closeModal(): void

  /** triggered before this layout view is appended to the DOM. This is NOT a cancelable event! */
  on(name: 'beforeAppendToDom', handler: (layout: Layout) => void): any
  /** Triggered after this layout view is appended to the DOM */
  on(name: 'afterAppendToDom', handler: (layout: Layout) => void): any
  /** Triggered before the user navigates (current view changes). This is NOT a cancelable event! */
  on(name: 'beforeAppendView', handler: (view: BackboneView) => void): any
  /** Triggered after the user navigates (current view changes)*/
  on(name: 'afterAppendView', handler: (view: BackboneView) => void): any
  /** triggered after a view is rendered */
  on(name: 'afterViewRender', handler?: (view: BackboneView) => any, context?: this): any
  /** triggered when a view's children finish rendering in the DOM */
  on(name: 'afterCompositeViewRender', handler?: (view: BackboneView) => any, context?: this): any
  on(eventName: string, callback?: (...args: any[]) => void, context?: any): any;
  on(eventMap: Backbone.EventsHash): any;
}
