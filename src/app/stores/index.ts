import { PROVIDER_AUTH, PROVIDER_USER, PROVIDER_UI } from '../constants';
import { createMemoryHistory } from 'history';

export class AuthStore { }

export class UserStore { }

export class UIStore {
  constructor(private history: any = createMemoryHistory()) { }

  getHistory() {
    return this.history;
  }
}

export type RootStores =
  { [key: string]: any }
  & Record<typeof PROVIDER_UI, UIStore>
  & Record<typeof PROVIDER_USER, UserStore>
  & Record<typeof PROVIDER_AUTH, AuthStore>;

export function createStores(history: any): RootStores {
  return {
    [PROVIDER_UI]: new UIStore(history),
    [PROVIDER_USER]: new UserStore(),
    [PROVIDER_AUTH]: new AuthStore(),
  } as RootStores;
}