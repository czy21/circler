import A from "../page/A";
import B from "../page/B";
import {ContactsOutlined, SettingOutlined} from '@ant-design/icons';
import React from "react"

export interface RouteModel {
    name: string,
    path: string
    icon: React.ReactNode
    component?: React.ComponentType<any>
    children?: Array<RouteModel>
}

const routes: RouteModel[] = [
    {
        name: "FlatA",
        path: "/system",
        icon: <SettingOutlined/>,
        component: A,
    },
    {
        name: "FlatB",
        path: "/b",
        icon: <ContactsOutlined/>,
        component: B,
    }
];
export default routes