import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Layout} from "antd";
import {connect} from "react-redux";
import {Action as HomeAction} from '@/redux/reducer/Home'

const AntdHeader = Layout.Header;

export interface State {
    collapsed: boolean
}

export const mapStateToProps = (state: any) => {
    return {
        collapsed: state.Home.collapsed
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        toggle: () => {
            dispatch(HomeAction.Collapse())
        }
    }
};

class Header extends React.Component<any, State> {

    render() {
        const {toggle} = this.props;

        return (
            <AntdHeader className={"header"}>
                {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'collapse',
                    onClick: toggle,
                })}
            </AntdHeader>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)