import Layout from '@/layout/Layout'
import UserList from './component/UserList'
import {renderRoutes, RouteConfig} from "react-router-config";

const PATH = '/user'

let routes: RouteConfig[] = [
    {
        path: PATH,
        component: Layout,
        routes: [
            {
                path: PATH,
                component: UserList,
                exact: true
            }
        ]
    }
]
export let App = () => renderRoutes(routes)
