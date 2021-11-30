import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "@/redux";
import Home from "@/layout/Home";
import 'codemirror/mode/yaml/yaml.js';

const store = createStore(rootReducer);

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Home/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
