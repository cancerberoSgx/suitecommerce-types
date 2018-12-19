import JSXView from '../src/jsx/JSXView'
import ReactLike from '../src/reactLike/ReactLike'

fdescribe('empty', () => {

  it('empty spec', () => {
    interface Context1 {
      people: {
        name: string,
        age: number
      }[]
    }
    class View1 extends JSXView<Backbone.Model, Context1> {
      jsxTemplate = (c: Context1) => <div>
        The people:
        <ul>
          {c.people.map(p => <li><span className="person-name">{p.name}</span> of {p.age} years old</li>)}
        </ul>
      </div>

      getContext() {
        return {
          people: [{ name: 'seba', age: 12 }]
        }
      }
    }
    const v = new View1()
    v.$el = jQuery('<div></div>').appendTo('body')
    v.render()
    expect(v.$el.html()).toContain(`<li><span class="person-name">seba</span> of 12 years old</li>`)
    // console.log(v.$el.html());

  })
})