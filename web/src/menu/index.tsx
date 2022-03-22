import React from "react"
import stub from '@/init'

export interface MenuModel {
    name: string,
    path?: string
    icon?: React.ReactNode
    children?: Array<MenuModel>
}

const menus: MenuModel[] = [
    // {
    //     name: "存储管理",
    //     icon: <stub.ref.icon.ai.ContactsOutlined/>,
    //     children: [
    //         {
    //             name: "存储卷管理",
    //             path: "/volume",
    //             icon: <stub.ref.icon.ai.ContactsOutlined/>,
    //         }
    //     ]
    // },
    // {
    //     name: "配置管理",
    //     path: "/configmap",
    //     icon: <stub.ref.icon.ai.ContactsOutlined/>,
    // },
    // {
    //     name: "项目管理",
    //     path: "/project",
    //     icon: <stub.ref.icon.ai.ContactsOutlined/>,
    // },
    // {
    //     name: "集群管理",
    //     path: "/cluster",
    //     icon: <stub.ref.icon.ai.ClusterOutlined/>,
    // },
    {
        name: "数据库",
        path: "/db",
        icon: <stub.ref.icon.ai.ContactsOutlined/>,
    },

];
export default menus