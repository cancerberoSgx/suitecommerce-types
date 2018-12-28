import { Deferred, Fn, View as View } from "..";
import { BackboneView } from "../thirdParty";

/**
 * The root view of the application. It is installed in a container_element HTML element that must exists in the HTML DOM (div `#main`).
Implement the concept of a `currentView`, this is at any time there is a MAIN view in which the use case implementation is shown. When the user navigates through different parts the application the current view ({@link getCurrentView}) changes  and the events {@link Layout#beforeAppendView} and {@link Layout#afterAppendView} are triggered. In general routers are responsible of the navigation by instantiating views and calling {@link showContent} or {@link showInModal}.

 */
export interface Layout extends View<{}> {

    /**
     * Set's the current view
     */
    showContent(view: View, dont_scroll?: boolean): Deferred

    /**
     * Get's the current view.
     */
    getCurrentView(): View

    /**
     * Shows given view in a modal
     */
    showInModal(view: View, options?: any): Deferred

    /**
     * Closes the current opened modal, if any
     */
    closeModal(): void
    
    /**triggered before this layout view is appended to the DOM. This is NOT a cancelable event! */
    on(name: 'beforeAppendToDom', handler: Fn): any
    /**Triggered after this layout view is appended to the DOM */
    on(name: 'afterAppendToDom', handler: Fn): any
    /**Triggered before the user navigates (current view changes). This is NOT a cancelable event! */
    on(name: 'beforeAppendView', handler: Fn<void, [BackboneView]>): any
    /**Triggered after the user navigates (current view changes)*/
    on(name: 'afterAppendView', handler: Fn<void, [BackboneView]>): any
}
