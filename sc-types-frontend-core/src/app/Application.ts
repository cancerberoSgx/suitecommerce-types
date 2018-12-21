import { ComponentContainer } from "../components/ComponentContainer";
import { Layout } from "./Layout";

/**
 * Defines the top level components and life-cycle of the Single Page Application
 */
export interface Application extends ComponentContainer {
    getLayout():Layout
}

export interface ModuleEntryPoint {
	/**
	 */
	mountToApp(componentContainer: Application):any
}
