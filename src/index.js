import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger'
import { loggers } from 'redux-act'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers'

import './index.scss';

import App from './components/App';


if (process.env.NODE_ENV === 'development') {
  window.Perf = require('react-addons-perf')
}

const logger = createLogger({
  ...loggers.reduxLogger,
});

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl
  );

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  });

  module.hot.accept('./reducers', () => {
    return store.replaceReducer(reducers);
  });
}
