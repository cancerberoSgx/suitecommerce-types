// import JSXBindView from '../src/jsx/JSXBindView'
// import ReactLike from '../src/reactLike/ReactLike' // needed for JSX
// import { BackboneView, BackboneModel, BackboneCollection, BackboneFormView } from 'sc-types-frontend';
// import Bind from '../src/reactLike/tags/Bind'
// import BindView from '../src/view/BindView';
// // debugger


// xdescribe('JSXBindViewBind and JSDOM in node.js', () => {

//   // class Model extends BackboneModel<Context>{
//   // }
//   // interface Moment{
//   //   when: Date
//   //   label:string
//   //   color?:  string
//   //   associates: Context[]
//   // }
//   // interface Context {
//   //   title: string
//   //   gender: 'male'|'female'|'other'|'not specified'
//   //   happyMoments: Moment[]
//   // }
//   // class View1 extends JSXBindView<Model, Context> {
//   //   jsxTemplate = (c: Context) => <div>
//   //     Let's try to bind something
//   //     <div>Title: <Bind name="title"><input></input></Bind></div>
//   //     <div>When: <Bind name="when"><input type="date"></input></Bind></div>
//   //     <div>Happy moments: 
//   //     <ul>
//   //       {c.happyMoments.map(m => <li>

//   //         </li>)}
//   //     </ul>
//   //     </div>
//   //   </div>

//   //   get counter() {
//   //     return this._counter++
//   //   }
//   //   _counter = 0

//   //   context: Context = {
//   //     title: 'foo', 
//   //     gender: 'male',
//   //     happyMoments: [{associates: [], when: new Date, label: 'foo'}]
//   //   }

//   //   getContext() {
//   //     return this.context
//   //   }
//   // }


// describe('BindView 1', () => {

//   interface Context {
//     name: string
//     greet?: string
//   }
//   class Model1 extends BackboneModel<Context>{ }
//   class View1 extends BindView<Model1, Context> {
//     template = (c: Context) => `
//       <label>Name<input class="name" ${this.bindAttribute('name')}></input></label><bR/>
//       <p class="greet">This is an automatic message: <span ${this.bindAttribute('greet')}></span> -- end. </p>
//     `


//     // events = <any>{
//     //   'click .button': ()=>this.model.set('age', this.model.get('age') + 1)
//     // }
//     // bindings = {
//     //   '[data-bind="name"]': 'name',
//     //   '[data-bind="greet"]': 'greet'
//     // }

//     initialize() {
//       super.initialize()
//       this.model = new Model1({ name: 'seba', greet: '' })
//       this.model.on('change', () => {
//         this.model.set('greet', `Hello ${this.model.get('name')}, how are you?`)
//       })
//     }
//   }
//   let v: View1

//   beforeEach(() => {
//     v = new View1()
//     v.$el = jQuery('<div></div>').appendTo('body')
//   })

//   function html(v: BackboneView) {
//     return v.$el.html().trim().replace(/\+/g, '')
//   }
  

//   fit('simple', done => {
//     // const v = new BindViewExample()
//     v.$el = jQuery('<div></div>').appendTo('body');
//     expect(v.$('.greet').length).toBe(0)
//     v.render()
//     expect(v.$('.greet').length).toBeGreaterThan(0)
//     expect(html(v)).toContain(`This is an automatic message:`)
//     debugger
// setTimeout(() => {
//   v.model.set('name', 'laura')

//   expect(html(v)).toContain(`laura, how are you?`)

//   v.destroy()
//   done()
// }, 300);
//     // v.$('.name').val('laura').change()
//   })

//   // fit('should render', () => {
//   //   v.render()
//   //   expect(html(v)).toBe(`<div>The people:<ul><li><span class="person-name">person0</span> of 1 years old</li></ul><button class="button032">Clickme</button></div>`)
//   // })

//   // it('should trigger clicks', () => {
//   //   v.render()
//   //   expect(html(v)).toContain(`<div>The people:<ul><li><span class="person-name">person0</span> of 1 years old</li></ul><button class="button032">Clickme</button></div>`)
      
//   //   v.$('.button032').click()
//   //   expect(html(v)).toContain(`<div>The people:<ul><li><span class="person-name">person0</span> of 1 years old</li><li><span class="person-name">person2</span> of 3 years old</li></ul><button class="button032">Clickme</button></div>`)


//   })

// })

// //   xdescribe('JSXBindView', () => {
// //     interface TheContext {
// //       name: string
// //       greet?: string
// //     }
// //     class TheModel extends BackboneModel<TheContext>{ }
// //     class JSXBindViewExample extends JSXBindView<TheModel, TheContext> {
// //       jsxTemplate = (c: TheContext) =>
// //         <div>
// //           <div>Name: <Bind name="name"><input className="name"></input></Bind></div>
// //           <div className="greet">
// //             This is an automatic message:
// //             <Bind name="greet"><span></span></Bind>-- end.
// //             </div>
// //         </div>
// //       initialize() {
// //         super.initialize()
// //         this.model = new TheModel({ name: 'seba', greet: '' })
// //         this.model.on('change', () => {
// //           this.model.set('greet', `Hello ${this.model.get('name')}, how are you?`)
// //         })
// //       }
// //     }
// //     it('simple', () => {

// //       const v = new JSXBindViewExample()
// //       v.$el = jQuery('<div></div>').appendTo('body');
// //       expect(v.$('.greet').length).toBe(0)
// //       v.render()
// //       expect(v.$('.greet').length).toBeGreaterThan(0)
// //       expect(v.$('.greet').text()).toContain(`This is an automatic message:`)
// //       v.$('.name').val('laura').change()
// //       expect(v.$('.greet').text()).toContain(`laura, how are you?`)
// //       v.destroy()
// //     })

// //   })
// // })


// // interface Person{
// //   name: string
// // }
// // class PersonModel extends BackboneModel<Person>{

// // }
// // class PersonCollection extends BackboneCollection<PersonModel>{

// // }
// // class Context {
// //   persons: PersonCollection
// // }
// // class PersonView extends BackboneView<PersonModel, Person> {

// // }

// // class CollectionView extends BackboneView<PersonModel, Person>{
// // jsxTempalte = (c: {persons: PersonCollection}): JSX.Element => { 
// //   return <div>
// //    <ul><Bind name="persons" view={PersonView}></Bind></ul>
// //   </div>
// // }
// // model: BackboneModel<Context>
// // constructor(){
// //   this.model = new BackboneModel<Context>()
// //   this.model.set('persons', new PersonCollection())
// // }
// // }