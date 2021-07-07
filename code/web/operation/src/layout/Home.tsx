import 'antd/dist/antd.less'
import '@/assets/less/Home.less'
import React from "react";
import {Layout} from 'antd';
import Sider from '@/layout/Sider'
import Header from '@/layout/Header'
import Content from '@/layout/Content'


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