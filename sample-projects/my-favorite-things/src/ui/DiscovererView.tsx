import { FormEvent, MouseEvent, Context } from 'react';
import { BackboneModel, jQuery, TemplateContext } from 'sc-types-frontend';
import { JSXView, ReactLike } from 'sc-types-frontend-extras';
import Manager, { InterestDiscoveredListener } from '../manager/Manager';
import { Interest } from '../types';

class Model1 extends BackboneModel {

}

interface Context1 extends TemplateContext {
  name: string
}

export default class DiscovererView extends JSXView<Model1, Context1> implements InterestDiscoveredListener{


  supportsFunctionAttributes = true
  
  jsxTemplate = (context: Context1) => <div>
    <div className="view1">Name: {context.name}</div>
    <button className="functionAttributeMethodCall1" onClick={e => this.clicked1(e)}>
      click me
    </button>
    <input onInput={e => this.changed(e)}>
    </input>
  </div>

  constructor(options?:any){
    super(options)
    Manager.getInstance().addInterestsDiscoverListener(this)
  }

  clicked1(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log('clicked', e.button, e.clientX, this.cid);
  }

  changed(e: FormEvent<HTMLInputElement>) {
    console.log('changed', e.currentTarget.value, this.cid);
  }
  
  handle(interests: Interest[]): void {
    alert('handleInterestDiscovered'+interests.length)
  }
}