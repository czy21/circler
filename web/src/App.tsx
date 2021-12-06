import 'antd/dist/antd.less'
import '@/assets/less/Home.less'
import stub from "@/init";
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import rootRedux from "@/redux";
import Home from "@/layout/Home";
import 'codemirror/mode/yaml/yaml.js';

const store = stub.ref.redux.createStore(rootRedux);

const App = () => {

    return (
        <stub.ref.antd.ConfigProvider componentSize={"middle"}>
            <stub.ref.reactRedux.Provider store={store}>
                <BrowserRouter>
                    <Home/>
                </BrowserRouter>
            </stub.ref.reactRedux.Provider>
        </stub.ref.antd.ConfigProvider>
    );
}

export default App;
