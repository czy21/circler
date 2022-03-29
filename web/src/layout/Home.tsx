import styles from './index.less'
import stub from "@/init";
import React from "react";
import Sider from '@/layout/Sider'
import Header, {mapStateToProps} from '@/layout/Header'
import Content from '@/layout/Content'

const Index: React.FC<any> = (props: any) => {

    return (
        <stub.ref.intl.IntlProvider locale={"en"} messages={props.locale.message && props.locale.message[props.locale.key]} defaultLocale={"en"}>
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

export default stub.ref.reactRedux.connect(mapStateToProps)(Index)