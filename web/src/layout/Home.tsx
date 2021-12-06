import stub from "@/init";
import React from "react";
import Sider from '@/layout/Sider'
import Header from '@/layout/Header'
import Content from '@/layout/Content'

const Home: React.FC<any> = (props: any) => {
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

export default Home