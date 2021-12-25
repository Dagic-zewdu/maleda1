import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware,createStore} from 'redux';
import {Provider}  from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import JavascriptTimeAgo from 'javascript-time-ago'
 
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
 
JavascriptTimeAgo.addLocale(en)
JavascriptTimeAgo.addLocale(ru)
const middlewares = [thunk]
const store=createStore(rootReducer,applyMiddleware(...middlewares));
ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
