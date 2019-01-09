import { ComponentContainer } from "../components/ComponentContainer";
import { Layout } from "./Layout";

/**
 * Defines the top level components and life-cycle of the Single Page Application
 */
export interface Application extends ComponentContainer {
	getLayout():Layout
	/** Internal - use it for unit-test only. Configuration object for this application instance */
	Configuration: any
}

export interface ModuleEntryPoint {
	/**
	 */
	mountToApp(componentContainer: Application):any
}
