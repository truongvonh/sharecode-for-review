import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ConnectedRouter } from 'connected-react-router';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import { history, store } from './store/';
import FirebaseHandler from 'utils/firebase';
import 'react-datepicker/dist/react-datepicker.css';

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

// Init firebase utils
// FirebaseHandler.initialApp();
if (process.env.NODE_ENV === 'production') {
  FirebaseHandler.initialApp();
}

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
