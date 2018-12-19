
import { Application } from 'sc-types-frontend';
import { Interest } from '../types';
import Manager from '../manager/Manager';

export interface Discoverer<I extends Interest = Interest>  {
  setup(config: DiscovererConfig): void
  discover(): I[]
}
export interface DiscovererConfig {
  manager: Manager
}