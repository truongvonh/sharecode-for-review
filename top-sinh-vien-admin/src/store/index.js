import createRootReducer from './mainReducer';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createBrowserHistory } from 'history';
import promise from 'redux-promise-middleware';
import { routerMiddleware } from 'connected-react-router';
import { callAPIMiddleware } from '../utils/helper';

const history = createBrowserHistory();
const initialState = {};

const middleware = () => {
  return composeWithDevTools(applyMiddleware(thunkMiddleware, promise, callAPIMiddleware, routerMiddleware(history)));
};

const store = createStore(createRootReducer(history), initialState, middleware());

export { history, store };