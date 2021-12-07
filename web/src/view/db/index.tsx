import Layout from '@/layout/Layout'
import InstanceList from '@v/db/component/InstanceList'
import {renderRoutes, RouteConfig} from "react-router-config";

const PATH = '/db'

let routes: RouteConfig[] = [
    {
        path: PATH,
        component: Layout,
        routes: [
            {
                path: PATH,
                component: InstanceList,
                exact: true
            }
        ]
    }
]
export let App = () => renderRoutes(routes)
