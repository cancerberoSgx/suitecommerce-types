import { ModelAttributes, BackboneModel } from 'sc-types-frontend';

export default class TypedBackboneModel<Attributes extends ModelAttributes = ModelAttributes> extends BackboneModel<Attributes> {
  setAttributes(a: Partial<Attributes>): this {
    return super.set(a) as this
  }
  getAttributes(): Attributes {
    return this.attributes
  }
  getAttribute<T = any>(name: keyof Attributes): T {
    return super.get(name as any)
  }
  setAttribute<T=any>(name:keyof Attributes, value: T, options?:Backbone.ModelSetOptions): this {
    return super.set(name as any, value, options) as this
  }
}
