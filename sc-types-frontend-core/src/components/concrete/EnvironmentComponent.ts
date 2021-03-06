import { BaseComponent } from "../BaseComponent";

/**
 * The EnvironmentComponent allow front-end accessing environment-related information like configuration, site settings, execution context and user session. This information is read-only, meaning that user changes in returned objects won't impact the application. An instance of this component can obtained by calling `container.getComponent("Environment")`.
 */
export interface EnvironmentComponent extends BaseComponent {

	/**
	 * Get the value of given Configuration key. If no key is provided then it returns the whole Configuration object. Use keys separated by dots to access inner objects, for example, `component.get('checkout.skipLogin')`. Notice that this method will always return a copy of the real objects so modifications on them won't have impact on the application.
	 * 
	 * @param {String} [key] configuration key to get the value of. It could be dot-separated to get an inner property. If not passed the whole configuration object will be returned. 
	 * @return {any} Returns the value of the given configuration key.
	 */
	getConfig(key?: string): any

	/**
	 * Returns true if the code is currently run by the SEO Page Generator and false if it currently run by the user's browser. 
	 * See [Page Generator NetSuite Help Center](https://system.netsuite.com/app/help/helpcenter.nl?fid=section_4053806622.html)
	 * 
	 */
	isPageGenerator() : boolean

	/**
	 * Returns the [site-settings object](https://system.netsuite.com/app/help/helpcenter.nl?fid=section_N2532617.html)
	 * 
	 * @param {String} [key] site-settings key to get the value of. It could be dot-separated to get an inner property. If not passed the 
	 * whole site-settings object will be returned. 
	 * @return {any} 
	 */
  getSiteSetting(key?: string): any
  
	/**
	 * Returns information regarding the current session, like current currency, language and pricelevel. 
	 */
	getSession(): Session

	/**
	 * Adds or update a translation key for given locale. Example: `setTranslation('es_ES', [{key: 'Faster than light', value: 'Más rápido que la luz'}])`. See {@tutorial frontend_internationalization}. 
	 * @param {string} locale 
	 * @param {Array<TranslationEntry>} keys keys and values to add for given locale
	 */
	setTranslation(locale: string, keys: TranslationEntry[]): void

}

export type TranslationEntry = {
  key: string;
  value: string;
};

export type Session = {
  currency: SessionCurrency;
  language: SessionLanguage;
  touchpoints: SessionTouchpoints;
  priceLevel: string;
};

export type SessionCurrency = {
  internalid: string;
  symbol: string;
  code: string;
  name: string;
  currencyname: string;
  isdefault: string;
  symbolplacement: number;
};

export type SessionLanguage = {
  name: string;
  isdefault: string;
  locale: string;
  languagename: string;
};

export type SessionTouchpoints = {
  logout: string;
  customercenter: string;
  serversync: string;
  viewcart: string;
  login: string;
  welcome: string;
  checkout: string;
  continueshopping: string;
  home: string;
  register: string;
  storelocator: string;
};

