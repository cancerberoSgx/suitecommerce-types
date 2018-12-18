import { Model, Router } from "backbone";
import { Application, Layout, ModuleEntryPoint } from "../app";
import { BackboneView } from "../thirdParty";
import { Fn, TODO } from "../types";

export class SCAUnitTestHelper {
  constructor(options: SCAUnitTestHelperOptions) {

  }
  application!: Application

  is_started: boolean=false
  layout!: Layout
  initialization_completed: boolean=false

  /** examle: 
   * ```
helper.testRoute(CartRouter, {
    instanceOf: CartDetailedView
  ,	instanceName: 'Cart.Views.Detailed'
  ,	navigateTo: '#cart'
});

```
   */
  testRoute(routerClass: typeof Router, test: { navigateTo: String, instanceName: String, instanceOf: any }, router_options: any): void {
    throw new Error('Not Implemented')
  }
  /*
test that given Backbone.Model validation works as expected
*/
  testModelValidations(model: Model, test: SCAUnitTestHelperModelValidationsTest, test_description: string): void {
    throw new Error('Not Implemented')
  }


  /*
test given Backbone.View context object
  */
  testContext(view: BackboneView, tests: TODO): void {
    throw new Error('Not Implemented')
  }

}


export interface SCAUnitTestHelperModelValidationsTest {
  data: any
  result: { validFields?: string[], invalidFields?: string[] }
}

export interface SCAUnitTestHelperOptions {
  startApplication?: boolean | Fn<void, [Application]>
  applicationName?: string
  applicationConfiguration?: any
  mountModules?: ModuleEntryPoint[]
}