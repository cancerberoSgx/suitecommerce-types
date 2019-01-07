import { BackboneCollection, BackboneModel } from 'sc-types-frontend'

export default class extends BackboneCollection<BackboneModel> {

  initialize(attributes?: any, options?: any) {
    super.initialize(attributes, options)
    this.models = [
      new BackboneModel({value: 'value1'}), 
      new BackboneModel({value: 'value2'}), 
    ]
  }

}