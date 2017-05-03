import { UIStore } from 'app/stores';
import * as invariant from 'invariant';

export class ProviderUtils {
  static getUIStore(...args: any[]): UIStore {
    return new UIStore()
  }
}

export const assert = invariant;