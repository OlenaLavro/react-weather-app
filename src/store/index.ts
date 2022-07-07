import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import * as LS from './localStorage';
import { rootReducer } from './reducers/weather';

const persistedState = LS.loadState();

export default function () {
  const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(thunkMiddleware)));

  store.subscribe(() => {
    const state = store.getState();
    LS.saveState({
      weather: { cities: state.weather.cities, error: null },
    });
  });
  return store;
}
