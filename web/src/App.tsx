import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "@/redux";
import Home from "@/layout/Home";
import 'codemirror/mode/yaml/yaml.js';
import {ConfigProvider} from "antd";

const store = createStore(rootReducer);

function App() {
    return (
        <ConfigProvider componentSize={"middle"}>
            <Provider store={store}>
                <BrowserRouter>
                    <Home/>
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    );
}

export default App;
