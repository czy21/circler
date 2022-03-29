import React from "react";
import stub from "@/init";
import menus from "@/menu";
import {Link} from "react-router-dom";
import {mapStateToProps} from "@/layout/Header"

function recursiveMenu(routes: any) {
    return routes.map((item: any, index: any) => {
        if (item.children) {
            return (
                <stub.ref.antd.Menu.SubMenu
                    key={item.name}
                    title={
                        <span>
                            {item.icon}
                            <span>{item.name}</span>
                        </span>
                    }
                >
                    {recursiveMenu(item.children)}
                </stub.ref.antd.Menu.SubMenu>
            )
        }
        return (
            <stub.ref.antd.Menu.Item
                key={item.name}
            >
                {item.icon}
                <span>{item.name}</span>
                <Link to={item.path}/>
            </stub.ref.antd.Menu.Item>
        )
    })
}

const Index: React.FC<any> = (props: any) => {
    return (
        <stub.ref.antd.Layout.Sider theme="dark" trigger={null} collapsible collapsed={props.collapsed}>
            <stub.ref.antd.Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
                {recursiveMenu(menus)}
            </stub.ref.antd.Menu>
        </stub.ref.antd.Layout.Sider>
    )

}

export default stub.ref.reactRedux.connect(mapStateToProps)(Index)