import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { Jumbotron, Container } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

import allReducers from './reducers/allReducers';

import Landing from './components/landing/Landing';
import Main from './components/main/Main';
import Profile from './components/profile/Profile';

import './index.css';

let store;
if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  store = createStore(
    allReducers,
    compose(
      applyMiddleware(
        thunkMiddleware,
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    )
  );
}
else {
  store = createStore(
    allReducers,
    compose(
      applyMiddleware(
        thunkMiddleware,
      )
    )
  );
}

const notFound = () => <Jumbotron fluid><Container><h1>Ricebook: Page Not Found!</h1></Container></Jumbotron >

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/main' component={Main} />
        <Route path='/profile' component={Profile} />
        <Route component={notFound} />
      </Switch>
    </Router>
  </Provider>

);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
