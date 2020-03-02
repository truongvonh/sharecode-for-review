import { createStore, applyMiddleware, combineReducers } from 'redux';
import auth from './auth/reducer';
import common from './common/reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  auth,
  common
});

export function initializeStore(initialState = {}) {
  return createStore(
    reducer,
    initialState,
    process.env.NODE_ENV !== 'production' ?
      composeWithDevTools(applyMiddleware(thunk)) :
      applyMiddleware(thunk),
  );
}
