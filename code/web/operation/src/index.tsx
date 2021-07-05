import React from 'react';
import ReactDOM from 'react-dom';
import Home from './layout/Home'
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import {BrowserRouter} from "react-router-dom";
import rootReducer from './redux/reducer'
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer);
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Home/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
serviceWorker.unregister();
