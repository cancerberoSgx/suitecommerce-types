
declare module 'sc-types-frontend-globals'

declare var define: <Return=any, Arguments extends any[]=any[]>(a: string | string[], b: string[] | Fn<Return, Arguments>, c?: Fn<Return, Arguments>) => void

type Fn<Return=any, Arguments extends any[]=any[]> = (...args: Arguments) => Return


/**
 * global SuiteCommerce namespace
 */
declare var SC: any

/**
 * Front-end global function to get the correct path of an static asset or service. Example of how to reference a service from a Backbone.Model: 
 * 
 * ```javascript
 *  return Backbone.Model.extend({ 
 *      url: Utils.getAbsoluteUrl(getExtensionAssetsPath('services/MyCoolModule.Service.ss'))
 * });
 * ```
 * @param {String} path a relative path to an asset or service
 * @return {String}
 */
declare var getExtensionAssetsPath: (path: string) => string

declare module "*.tpl" {
  // HEADS up: copied from View.ts since we cannot import if we are declaring ambient modules
  const value: ((<Context=any> (c: Context) => string) & { Name?: string })
  export default value;
}
