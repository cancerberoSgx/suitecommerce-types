import { JSXView, ReactLike } from 'sc-types-frontend-extras';
import { BackboneModel, BackboneCollection, BackboneCachedCollection, BackboneCachedModel } from 'sc-types-frontend';

// Example of a minimal JSXView with context containing a collection
interface Context1 { people: { name: string, age: number }[] }
class View1 extends JSXView<Backbone.Model, Context1> {
  jsxTemplate = (c: Context1) => <div>
    The people:
          <ul>
      {c.people.map(p => <li><span className="person-name">{p.name}</span> of {p.age} years old</li>)}
    </ul>
  </div>
}

// Example of a JSXView that will update with its BackboneModel changes
// interface Context2 { people: Person[] }
interface Person{ 
  name: string, 
  age: number 
}
class PersonModel extends BackboneCachedModel<Person> {}
class PersonCollection extends BackboneCachedCollection<PersonModel>{}
class View2 extends JSXView<PersonModel, Context1> {
  initialize(){
    super.initialize()
    this.collection = new PersonCollection()
    this.collection.on('change', ()=>this.render())
    this.collection.fetch()
  }
  jsxTemplate = (c: Context1) => <div>
    The people:
          <ul>
      {c.people.map(p => <li><span className="person-name">{p.name}</span> of {p.age} years old</li>)}
    </ul>
  </div>
}