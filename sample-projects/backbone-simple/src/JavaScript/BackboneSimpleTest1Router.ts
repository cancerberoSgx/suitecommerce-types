import { BackboneRouter } from 'sc-types-frontend';
import BackboneSimpleTest1LandingView from './BackboneSimpleTest1LandingView';

export default class extends BackboneRouter {

  routes = {
    'page/:id': 'page'
  }

  page(id: string) {
    const view = new BackboneSimpleTest1LandingView({ id })
    view.showContent();
  }
}
