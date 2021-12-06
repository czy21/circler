import 'antd/dist/antd.less'
import '@/assets/less/Home.less'
import stub from "@/init";
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import Home from "@/layout/Home";
import 'codemirror/mode/yaml/yaml.js';

const App = () => {

    return (
        <stub.ref.antd.ConfigProvider componentSize={"middle"}>
            <stub.ref.reactRedux.Provider store={stub.store}>
                <BrowserRouter>
                    <Home/>
                </BrowserRouter>
            </stub.ref.reactRedux.Provider>
        </stub.ref.antd.ConfigProvider>
    );
}

export default App;
