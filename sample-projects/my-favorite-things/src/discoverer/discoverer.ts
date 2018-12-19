import Manager from '../manager/Manager';
import { Interest } from '../types';

export interface Discoverer<I extends Interest = Interest>  {
  setup(config: DiscovererConfig): Discoverer<I>
  dispose(): void
  discover(): I[]
}
export interface DiscovererConfig {
  manager: Manager
}