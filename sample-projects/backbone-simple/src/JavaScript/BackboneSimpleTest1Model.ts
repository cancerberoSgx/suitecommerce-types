import { BackboneModel } from 'sc-types-frontend';

export default class CoolFeature56Model extends BackboneModel {

  initialize(attributes?: any, options?: any) {
    super.initialize(attributes, options)
  }

  somethingNew(): number[] {
    return [1, 2, 3]
  }

  fetch(options: any) {
    const p = super.fetch(options)
    p.then(response => response.bar = this.somethingNew())
    return p
  }

  parse(response: any, options?: any): any {
    return {
      ...super.parse(response, options),
      foo: 112
    }
  }
}