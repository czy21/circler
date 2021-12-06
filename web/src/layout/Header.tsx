import stub from "@/init";
import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';

export const mapStateToProps = (state: any) => {
    return {
        collapsed: state.home.collapsed
    }
};
const Header: React.FC<any> = (props: any) => {
    const dispatch = stub.ref.reactRedux.useDispatch()
    return (
        <stub.ref.antd.Layout.Header className={"header"}>
            {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'collapse',
                onClick: () => {
                    dispatch(stub.reducer.action.home.collapse())
                },
            })}
        </stub.ref.antd.Layout.Header>
    )

}

export default stub.ref.reactRedux.connect(mapStateToProps)(Header)