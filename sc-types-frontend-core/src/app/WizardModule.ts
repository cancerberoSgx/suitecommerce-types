import { BackboneView, Deferred } from "../thirdParty";

/**
 * Base class to implement new Checkout Wizard Modules. See {@link CheckoutComponent#addModuleToStep}. Users need to extend this class to implement their custom checkout wizard modules
 */
export class WizardModule extends BackboneView {

  errors: string[]

  /**current module error if any */
  error: WizardModuleError

	/**
	 * General method to disable the module interface called at the moment of submitting the step
	 */
  disableInterface() {
    throw new Error("Method not implemented.")
  }

	/**
	 * General method to re-enable the module interface called after getting an ERROR on submitting
	 */
  enableInterface() {
    throw new Error("Method not implemented.")
  }

	/**
	 * Auxiliary method to refresh a module. For example, iIt is implemented by the OrderWizard to refresh titles
	 */
  refresh() {
    throw new Error("Method not implemented.")
  }

	/**
	 * by default, a module returns it's validation promise. 
	 * @returns {Deferred} resolved if this module was successfully submitted or rejected otherwise
	 */
  submit(): Deferred<any> {
    throw new Error("Method not implemented.")
  }

	/**
	 */
  cancel(): Deferred<any> {
    throw new Error("Method not implemented.")
  }

	/**
	 * validate resolves a promise because maybe it needs to do some ajax for validation
	 */
  isValid(): Deferred<any> {
    throw new Error("Method not implemented.")
  }

	/**
	 * Determines is a module is active (can be submitted, rendered or just use) or not. 
	 */
  isActive(): boolean {
    throw new Error("Method not implemented.")
  }

	/**
	 * returns the title of the module, can be overridden in the configuration file. 
	 */
  getTitle(): string {
    throw new Error("Method not implemented.")
  }

	/**
	 * 
	 */
  manageError(error: WizardModuleError): void {
    throw new Error("Method not implemented.")
  }

	/**
	 * Shows the current error if any, see {@link error}
	 */
  showError(): void {
    throw new Error("Method not implemented.")
  }

	/**
	 * clear all error messages being shown
	 */
  clearError(): void {
    throw new Error("Method not implemented.")
  }

	/**
	 * clear all general messages being shown
	 */
  clearGeneralMessages(): void {
    throw new Error("Method not implemented.")
  }

	/**
	 * Notify a message (not just an error) at step level. Type can be a boolean (true: for errors, false: for success) or string to add a class alert-<type>
	 */
  showGeneralMessage(message: string, type: string): void {
    throw new Error("Method not implemented.")
  }

}

/** Generic wizard module error data object */
export interface WizardModuleError {
  errorMessage: string
  errorCode: string
}

