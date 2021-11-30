import React from "react";
import {Layout, Menu,} from "antd";
import {connect} from "react-redux";
import {mapStateToProps} from '@/layout/Header'
import menus from "@/menu";
import {Link} from "react-router-dom";

const AntdSider = Layout.Sider;

const {SubMenu} = Menu;


function recuriveMenu(routes: any) {
    return routes.map((item:any, index:any) => {
        if (item.children) {
            return (
                <SubMenu
                    key={item.name}
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
                key={item.name}
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
            <AntdSider theme="dark" trigger={null} collapsible collapsed={this.props.collapsed}>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]} >
                    {recuriveMenu(menus)}
                </Menu>
            </AntdSider>
        )
    }
}

export default connect(mapStateToProps)(Sider)