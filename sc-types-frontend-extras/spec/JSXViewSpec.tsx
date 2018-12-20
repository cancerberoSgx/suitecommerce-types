import JSXView from '../src/jsx/JSXView'
import ReactLike, { ReactLikeElement } from '../src/reactLike/ReactLike' // needed for JSX
import { BackboneView, BackboneModel } from 'sc-types-frontend';

describe('JSXViews and JSDOM in node.js', () => {

  interface Context1 {
    people: {
      name: string,
      age: number
    }[]
  }
  class View1 extends JSXView<BackboneModel, Context1> {
    jsxTemplate = (c: Context1) => <div>
      The people:
      <ul>
        {c.people.map(p => <li>
          <span className="person-name">{p.name}</span> of {p.age} years old
          </li>)}
      </ul>
      <button className="button032">Clickme</button>
    </div>

    get counter() {
      return this._counter++
    }
    _counter = 0

    events() {
      return {
        'click .button032': e => {
          this.context.people.push({
            name: `person${this.counter}`,
            age: this.counter
          })
          this.render()
        }
      }
    }

    context: Context1 = {
      people: [{ name: `person${this.counter}`, age: this.counter }]
    }

    getContext() {
      return this.context
    }
  }

  let v: View1
  beforeEach(() => {
    v = new View1()
    v.$el = jQuery('<div></div>').appendTo('body')
  })

  function html(v: BackboneView) {
    return v.$el.html().trim().replace(/\+/g, '')
  }

  it('should render', () => {
    v.render()
    expect(html(v)).toBe(`<div>The people:<ul><li><span class="person-name">person0</span> of 1 years old</li></ul><button class="button032">Clickme</button></div>`)
  })

  it('should trigger clicks', () => {
    v.render()
    expect(html(v)).toContain(`<div>The people:<ul><li><span class="person-name">person0</span> of 1 years old</li></ul><button class="button032">Clickme</button></div>`)

    v.$('.button032').click()
    expect(html(v)).toContain(`<div>The people:<ul><li><span class="person-name">person0</span> of 1 years old</li><li><span class="person-name">person2</span> of 3 years old</li></ul><button class="button032">Clickme</button></div>`)
  })
})
