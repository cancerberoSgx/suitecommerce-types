// when transpiled this file wont have tslib import statement like var tslib_1 = require("tslib"); . Just uncommenting the following line will solve the problem.

// import { Application } from 'sc-types-frontend'
define('MineModel', ['Backbone.Model'], function(BackboneModel: any){
  async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(() => {
    resolve()
  }, ms))
}
  return BackboneModel.extend({
  async magick(t:1|2|3|4): Promise<number>{
    await sleep(t)
    return t+1
  }
})
})

  