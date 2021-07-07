import {ContactsOutlined} from '@ant-design/icons';
import React from "react"

export interface MenuModel {
    name: string,
    path?: string
    icon: React.ReactNode
    children?: Array<MenuModel>
}

const menus: MenuModel[] = [
    {
        name: "存储管理",
        icon: <ContactsOutlined/>,
        children: [
            {
                name: "存储卷管理",
                path: "/volume",
                icon: <ContactsOutlined/>,
            }
        ]
    },
    {
        name: "配置管理",
        path: "/configmap",
        icon: <ContactsOutlined/>,
    }
];
export default menus