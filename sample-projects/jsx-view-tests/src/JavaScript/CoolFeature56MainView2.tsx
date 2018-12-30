import { BackboneModel, underscore } from 'sc-types-frontend';
import CoolFeature56Model from './CoolFeature56Model';
import JSXView from './JSXView';
import ReactLike from './ReactLike';
import { JSXTemplate } from './JSXTemplate';

export default class extends JSXView<BackboneModel, CoolFeature56MainViewContext2>{

  jsxTemplate: JSXTemplate<CoolFeature56MainViewContext2> = context => <form>
    <label>Name
      <input value={context.name} className="name"></input>
      </label>
      <br />
    <label>Last Name<input value={context.lastName}></input></label>
    <select>
      {context.genders.map(g =>
        <option>{g}</option>
      )}
    </select>
    <input type="submit" className="save">Save</input>
  </form>

  events = {
    'click .save': this.click.bind(this),
    'keyup .name': this.change.bind(this)
  } as any

  click(e: JQuery.ClickEvent) {
    e.preventDefault()
    e.stopPropagation()
    alert(`Done, thanks! ${e.clientX}`)
  }
  
  change(e: JQuery.ChangeEvent<any, any, HTMLInputElement>) {
    console.log('asdas', e.currentTarget.value);
  }

  getContext(): CoolFeature56MainViewContext2 {
    return {
      name: 'Sebastián',
      lastName: 'Gurin',
      gender: 'male',
      genders: ['male', 'women', 'other']
    }
  }

}

export interface CoolFeature56MainViewContext2 {
  name: string
  lastName: string
  gender: Gender
  genders: ['male', 'women', 'other']
}
type Gender = 'male' | 'women' | 'other'