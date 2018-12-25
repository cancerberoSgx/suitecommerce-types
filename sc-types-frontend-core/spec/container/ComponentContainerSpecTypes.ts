import { expectType } from 'tsd-check';
import { ComponentContainer } from '../../src';
import { EnvironmentComponent } from '../../src/components/concrete/EnvironmentComponent';

describe('ComponentContainer', () => {
  let container: ComponentContainer
  describe('getComponent', () => {
    it('by name should cast', () => {
      expectType<EnvironmentComponent>(container.getComponent('Environment'))
    })
    it('generics should cast', () => {
      expectType<EnvironmentComponent>(container.getComponent<EnvironmentComponent>('foo'))
    })
  })
})