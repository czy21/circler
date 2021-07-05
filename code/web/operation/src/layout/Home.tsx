import 'antd/dist/antd.less'
import '../assets/less/Home.less'
import React from "react";
import {Layout} from 'antd';
import Sider from './Sider'
import Header from './Header'
import Content from './Content'


export default class Home extends React.Component<any, any> {
    render() {
        return (
            <Layout>
                <Sider/>
                <Layout className={"container"}>
                    <Header/>
                    <Content/>
                </Layout>
            </Layout>
        );
    }
}