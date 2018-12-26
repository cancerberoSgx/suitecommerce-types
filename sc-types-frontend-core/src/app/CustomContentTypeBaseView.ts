import { Deferred, BackboneView } from "..";
// import { BackboneView } from "../thirdParty";

/**
 * Base CCT class from where all the custom CCT extend from inherits the basic render and destroy methods from Backbone.View
 */
export class CustomContentTypeBaseView<Settings=any, ContextData=any> extends BackboneView {

  /**
   * Contains the current settings of this CCT - Settings are configured by SMT user. This is an object which properties are named the same as the Custom Record type field ids defined fot this CCT settings, for example, ```this.settings.custrecord_acme_cct1_main_color```
   */
  settings: Settings

	/**
	 * This method is called the first time a CCT is dragged from the admin panel to the application. It indicates when does the CCT instance has finished making all the Ajax call that are necessary for rendering. Also it initializes the CCT settings. If the CCT needs to do some async initialization, for example doing ajax first or other logic, this method should be overridden and and return a {@link Deferred}. Any error that cause that the CustomContentType object could not be installed, means that the CCT will be removed from the DOM and destroyed
	 * @param settings the settings of the CCT. TODO: does this object have some minimal API ? 

	 */
  install(settings: Settings, context_data: ContextData): Deferred {
    throw new Error("Method not implemented.")
  }

	/**
	 * Validate if the context that the CCT receives is enough for the CCT to work returning true or false otherwise.

		* @param  context_data An object with the contexts found
		* @return  if true it means everything is fine for this CCT, if false it will prevent the 'save' action to take effect
		*/
  validateContextDataRequest(context_data: ContextData): boolean {
    throw new Error("Method not implemented.")
  }

	/** TODO: what are valid values here ? how do I know which values I can use?
	 * Returns the list of contexts that this CCT is requesting the list of contexts that you may need to run the CCT. 
	 * @return {Array<String>} For example, if this CCT is meant to be dropped in over an "item", for example in a PDP or in an item cell of the search page then this method should return `['item']`
	 */
  getContextDataRequest(): string[] {
    throw new Error("Method not implemented.")
  }


	/**
	 * Called when the user edits the CCT settings in SMT panel. Each specific CCT will have to overrides this method in order to update the settings, validating the input and probably trigger a re-render of this view for visual feedback. Validation is done by returning a resolved or rejected {@link Deferred}. 
	 * @param  settings the new settings of the CCT
	 * @return {Deferred} rejected means given settings are invalid for this instance. 
	 */
  update(settings: Settings): Deferred {
    throw new Error("Method not implemented.")
  }

}