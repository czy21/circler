import React from "react"
import stub from '@/init'
export interface MenuModel {
    name: string,
    path?: string
    icon: React.ReactNode
    children?: Array<MenuModel>
}

const menus: MenuModel[] = [
    {
        name: "存储管理",
        icon: <stub.ref.icon.ContactsOutlined/>,
        children: [
            {
                name: "存储卷管理",
                path: "/volume",
                icon: <stub.ref.icon.ContactsOutlined/>,
            }
        ]
    },
    {
        name: "配置管理",
        path: "/configmap",
        icon: <stub.ref.icon.ContactsOutlined/>,
    },
    {
        name: "项目管理",
        path: "/project",
        icon: <stub.ref.icon.ContactsOutlined/>,
    },
    {
        name: "集群管理",
        path: "/cluster",
        icon: <stub.ref.icon.ClusterOutlined/>,
    },
    {
        name: "数据库",
        path: "/database",
        icon: <stub.ref.icon.ContactsOutlined/>,
    },

];
export default menus