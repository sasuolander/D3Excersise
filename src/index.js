import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './styles/index.scss';
import './styles/App.scss'
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./component/redux/store";
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
    <Router>
        <Provider store={store}>
        <App/>
        </Provider>
    </Router>
    , document.getElementById('root'))

;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
