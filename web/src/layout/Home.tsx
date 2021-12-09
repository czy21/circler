import styles from './index.m.less'
import stub from "@/init";
import React from "react";
import Sider from '@/layout/Sider'
import Header, {mapStateToProps} from '@/layout/Header'
import Content from '@/layout/Content'


const Home: React.FC<any> = (props: any) => {
    return (
        <stub.ref.intl.IntlProvider locale={props.locale.key} messages={props.locale.messages}>
            <stub.ref.antd.Layout>
                <Sider/>
                <stub.ref.antd.Layout className={styles.container}>
                    <Header/>
                    <Content/>
                </stub.ref.antd.Layout>
            </stub.ref.antd.Layout>
        </stub.ref.intl.IntlProvider>
    );

}

export default stub.ref.reactRedux.connect(mapStateToProps)(Home)