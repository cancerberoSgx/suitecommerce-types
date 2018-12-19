import JSXBindView from '../src/jsx/JSXBindView'
import ReactLike from '../src/reactLike/ReactLike' // needed for JSX
import { BackboneView, BackboneModel, BackboneCollection } from 'sc-types-frontend';
import Bind from '../src/reactLike/tags/Bind'

describe('JSXBindViewBind and JSDOM in node.js', () => {

  class Model extends BackboneModel<Context>{
  }
  interface Moment{
    when: Date
    label:string
    color?:  string
    associates: Context[]
  }
  interface Context {
    title: string
    gender: 'male'|'female'|'other'|'not specified'
    happyMoments: Moment[]
  }

  class View1 extends JSXBindView<Model, Context> {
    jsxTemplate = (c: Context) => <div>
      Let's try to bind something
      <div>Title: <Bind name="title"><input></input></Bind></div>
      <div>When: <Bind name="when"><input type="date"></input></Bind></div>
      <div>Happy moments: 
      <ul>
        {c.happyMoments.map(m => <li>

          </li>)}
      </ul>
      </div>
      
      {/* <button className="button032">Clickme</button> */}
    </div>

    get counter() {
      return this._counter++
    }
    _counter = 0

    // events() {
    //   return {
    //     'click .button032': e => {
    //       this.context.people.push({
    //         name: `person${this.counter}`,
    //         age: this.counter
    //       })
    //       this.render()
    //     }
    //   }
    // }

    context: Context = {
      title: 'foo', 
      gender: 'male',
      happyMoments: [{associates: [], when: new Date, label: 'foo'}]
    }

    getContext() {
      return this.context
    }
  }

  let v: View1

  // beforeEach(() => {
  //   v = new View1()
  //   v.$el = jQuery('<div></div>').appendTo('body')
  // })

  // function html(v: BackboneView) {
  //   return v.$el.html().trim().replace(/\+/g, '')
  // }
  
  // it('should render', () => {
  //   v.render()
  //   expect(html(v)).toBe(`<div>The people:<ul><li><span class="person-name">person0</span> of 1 years old</li></ul><button class="button032">Clickme</button></div>`)
  // })

  // it('should trigger clicks', () => {
  //   v.render()
  //   expect(html(v)).toContain(`<div>The people:<ul><li><span class="person-name">person0</span> of 1 years old</li></ul><button class="button032">Clickme</button></div>`)
      
  //   v.$('.button032').click()
  //   expect(html(v)).toContain(`<div>The people:<ul><li><span class="person-name">person0</span> of 1 years old</li><li><span class="person-name">person2</span> of 3 years old</li></ul><button class="button032">Clickme</button></div>`)
  // })
})


// interface Person{
//   name: string
// }
// class PersonModel extends BackboneModel<Person>{

// }
// class PersonCollection extends BackboneCollection<PersonModel>{

// }
// class Context {
//   persons: PersonCollection
// }
// class PersonView extends BackboneView<PersonModel, Person> {

// }

// class CollectionView extends BackboneView<PersonModel, Person>{
// jsxTempalte = (c: {persons: PersonCollection}): JSX.Element => { 
//   return <div>
//    <ul><Bind name="persons" view={PersonView}></Bind></ul>
//   </div>
// }
// model: BackboneModel<Context>
// constructor(){
//   this.model = new BackboneModel<Context>()
//   this.model.set('persons', new PersonCollection())
// }
// }