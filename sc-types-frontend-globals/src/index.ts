
declare module 'sc-types-frontend-globals'

declare var define: <Return=any, Arguments extends any[]=any[]>(a: string | string[], b: string[] | Fn<Return, Arguments>, c?: Fn<Return, Arguments>) => void

/** can be used to require SCA AMD modules by AMD name that are known to be loaded / combined, for example using sc-tsc --addExtraAmdDependendenciesForSCAUnitTests. Use it only for tests since this could fail on versions combining without require (AMD-optimize) for example. Also since you are requiring SCA internal modules, take into account that their names could change so your code won't be portable */
declare var require: <DependencyType=any>(d: string)=>DependencyType
// declare var require: (<DependencyType=any>(d: string)=>DependencyType)|(<DependencyTypes extends any[] = any[]> (d: string[], callback: (...deps: DependencyTypes)=>any)=> any)
// declare var require: <DependencyTypes extends any[] = any[]> (d: string[], callback: (...deps: DependencyTypes)=>any)=> any

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
