import * as React from 'react';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Root } from './containers/Root';
import { RootStores } from './stores';
import { ProviderUtils, assert } from './utils';
import { LazyRoute, NotFound } from './components';
import { DISABLE_SIGNUP, PATH_APP, PATH_LOGIN } from './constants';

// enable MobX strict mode
useStrict(true);

// prepare root DOM object
export function createDOM(stores: RootStores) {
  const uiStore = ProviderUtils.getUIStore(stores);
  assert(uiStore, 'UIStore should be provided.');

  return (
    <Provider {...stores} >
      <Root>
        <Router history={uiStore.getHistory()}>
          <Switch>
            {/* Use System.import() to implement lazy route */}
            <LazyRoute path={PATH_APP} />
            <LazyRoute path={PATH_LOGIN} />
            {!DISABLE_SIGNUP && (
              <LazyRoute />
            )}
            <Redirect from="/" to={PATH_LOGIN} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Root>
    </Provider >
  );
}
