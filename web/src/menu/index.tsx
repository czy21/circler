import React from "react"
import stub from '@/init'

export interface MenuModel {
    name: string,
    path?: string
    icon?: React.ReactNode
    children?: Array<MenuModel>
}

const menus: MenuModel[] = [
    {
        name: "存储",
        icon: <stub.ref.icon.ai.ContactsOutlined/>,
        children: [
            {
                name: "存储卷",
                path: "/volume",
                icon: <stub.ref.icon.ai.ContactsOutlined/>,
            }
        ]
    },
    {
        name: "配置",
        path: "/configmap",
        icon: <stub.ref.icon.ai.ContactsOutlined/>,
    },
    {
        name: "项目",
        path: "/project",
        icon: <stub.ref.icon.ai.ContactsOutlined/>,
    },
    {
        name: "集群",
        path: "/cluster",
        icon: <stub.ref.icon.ai.ClusterOutlined/>,
    },
    {
        name: "数据库",
        path: "/db",
        icon: <stub.ref.icon.ai.ContactsOutlined/>,
    },
    {
        name: "用户",
        path: "/user",
        icon: <stub.ref.icon.ai.ContactsOutlined/>,
    },
];
export default menus