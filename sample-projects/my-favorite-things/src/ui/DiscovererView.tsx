import { BackboneModel,  TemplateContext } from 'sc-types-frontend';
import { JSXView, ReactLike, FormEvent, MouseEvent } from 'sc-types-frontend-extras';
import Manager, { InterestDiscoveredListener } from '../manager/Manager';
import { Interest } from '../types';

export default class DiscovererView extends JSXView<BackboneModel, Context> implements InterestDiscoveredListener {

  supportsFunctionAttributes = true

  jsxTemplate = (context: Context) => <div>
    <div className="view1" data-test-id="DiscovererView">Name: {context.name}</div>
    <button className="functionAttributeMethodCall1" onClick={e => this.clicked1(e)}>
      click me
    </button>
    <input onInput={e => this.changed(e)}>
    </input>

    New interests
    <ul className="new-interests">
      {context.newInterests.map(i =>
        <li>{i.name}</li>
      )}
    </ul>
    All Interests
    <ul className="all-interests">
      {context.interests.map(i =>
        <li>{i.name}</li>
      )}
    </ul>
  </div>
  
  newInterests: Interest[] = [];

  constructor(options?: any) {
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
    console.log('handleInterestDiscovered', interests.length, Manager.getInstance().getInterests().length)
    this.newInterests = interests
    this.render()
  }

  getContext(): Context {
    return {
      interests: Manager.getInstance().getInterests(),
      newInterests: this.newInterests ||[],
      name: 'fooo'
    }
  }
}
interface Context extends TemplateContext {
  interests: Interest[]
  newInterests: Interest[]
  name: string
}