import React from "react";
import {Layout, Menu,} from "antd";
import {connect} from "react-redux";
import {mapStateToProps} from './Header'
import routes, {RouteModel} from '../route'
import {Link} from "react-router-dom";

const AntdSider = Layout.Sider;

const {SubMenu} = Menu;


function recuriveMenu(routes: RouteModel[]) {
    return routes.map((item, index) => {
        if (item.children) {
            return (
                <SubMenu
                    key={index}
                    title={
                        <span>
                            {item.icon}
                            <span>{item.name}</span>
                        </span>
                    }
                >
                    {recuriveMenu(item.children)}
                </SubMenu>
            )
        }
        return (
            <Menu.Item
                key={index}
            >
                {item.icon}
                <span>{item.name}</span>
                <Link to={item.path}/>
            </Menu.Item>
        )
    })
}

class Sider extends React.Component<{ collapsed?: boolean }, any> {

    render() {
        return (
            <AntdSider trigger={null} collapsible collapsed={this.props.collapsed}>
                <Menu theme="dark" defaultSelectedKeys={["0"]}>
                    {recuriveMenu(routes)}
                </Menu>
            </AntdSider>
        )
    }
}

export default connect(mapStateToProps)(Sider)