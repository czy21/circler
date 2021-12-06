import stub from "@/init";
import React from "react";
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import {Action as HomeAction} from '@/redux/reducer/Home'

interface State {
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
            <stub.ref.antd.Layout.Header className={"header"}>
                {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'collapse',
                    onClick: toggle,
                })}
            </stub.ref.antd.Layout.Header>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)