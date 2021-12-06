import stub from "@/init";
import 'antd/dist/antd.less'
import '@/assets/less/Home.less'
import React from "react";
import Sider from '@/layout/Sider'
import Header from '@/layout/Header'
import Content from '@/layout/Content'

export default class Home extends React.Component<any, any> {
    render() {
        return (
            <stub.ref.antd.Layout>
                <Sider/>
                <stub.ref.antd.Layout className={"container"}>
                    <Header/>
                    <Content/>
                </stub.ref.antd.Layout>
            </stub.ref.antd.Layout>
        );
    }
}