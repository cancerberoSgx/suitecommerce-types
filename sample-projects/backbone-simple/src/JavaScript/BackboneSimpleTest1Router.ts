import { Backbone, Application } from 'sc-types-frontend';
import BackboneSimpleTest1LandingView from './BackboneSimpleTest1LandingView';

class BackboneSimpleTest1Router extends Backbone.Router {
  debugRouteListener:(s: string, args: string[]) => any
  application: Application

  // heads up we need to declare a getter because - cannot put routes as property here because backbone needs it to be in prototype, just like Backbone.View.events - need to be typed as method
  get routes() {
    return { 'page/:id': 'page' }
  }

  page(id?: string) {
    const view = new BackboneSimpleTest1LandingView({ id })
    this.application && this.application.getLayout().showContent(view)
    this.debugRouteListener && this.debugRouteListener('page', [id])
  }
}
export default BackboneSimpleTest1Router