import stub from "@/init";
import React from "react";
import styles from './index.m.less'
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';

export const mapStateToProps = (state: any) => {
    return {
        collapsed: state.home.collapsed,
        locale: state.home.locale
    }
};
const Header: React.FC<any> = (props: any) => {

    return (
        <stub.ref.antd.Layout.Header className={styles.header}>
            {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: styles.collapse,
                onClick: () => {
                    stub.store.dispatch(stub.reducer.action.home.collapse())
                },
            })}
            <stub.ref.antd.Select options={[{label: "简体中文", value: "zh-CN"}]}>

            </stub.ref.antd.Select>
        </stub.ref.antd.Layout.Header>
    )

}

export default stub.ref.reactRedux.connect(mapStateToProps)(Header)