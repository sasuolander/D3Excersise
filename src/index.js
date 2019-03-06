import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './styles/index.scss';
import './styles/App.scss'
import App from './App';
import rootReducer from './component/redux/reducer/databasesReducers'
import * as serviceWorker from './serviceWorker';

const database = createStore(rootReducer)
console.log(database.getState())

ReactDOM.render(
    <Provider store={database}>
    <App/>
    </Provider>
    , document.getElementById('root'))

;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
