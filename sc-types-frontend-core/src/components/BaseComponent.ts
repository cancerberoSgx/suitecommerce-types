import { ComponentContainer } from "./ComponentContainer";
import { CancelableEvents, CancelableMethod } from "./CancelableEvents";

export interface ComponentDefinition {

  /**
   * The name which identify this kind of component. This name is used both for registering a new component and
   * getting a component implementation with {@link ComponentContainer}
   */
  componentName: string

  application: ComponentContainer
}
/**
 * Base abstract class for front-end components. Use method {@link BaseComponent.extend} to build concrete components.
 */
export interface BaseComponent extends CancelableEvents, ComponentDefinition {


	/**
	 * Extends the current component to generate a child one
	 * @param {{}} componentDefinition Any object with properties/methods that will be used to generate the Component that will be returned
	 * @return {BaseComponent}
	 */
  extend(componentDefinition: ComponentDefinition): BaseComponent

	/**
	 * Allow to attach an event handler into a particular event name. Alias for {@link CancelableEvents#cancelableOn}
	 */
  on: CancelableMethod
	/**
	 * Allow to detach an event handler. Alias for {@link CancelableEvents#cancelableOff}
	 */
  off: CancelableMethod
}
