import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import {Provider} from 'react-redux';
import './index.css';
import {rootReducer} from './reducers';

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunkMiddleware),
));

ReactDOM.render(
    <Provider store={store}>
            <App/>
    </Provider>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
