import React from 'react';
import ReactDOM from 'react-dom';
import '../public/stylesheets/style.scss';
import App from '../modules/components/index.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import auth from '../modules/reducers.js'

// initial state and reducer
const initialState = {
  user: userData ? userData.username : null
}

// store
let store = createStore(auth, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);