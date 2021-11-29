import Layout from '@/layout/Layout'
import List from '@v/database/component/List'
import {renderRoutes, RouteConfig} from "react-router-config";

const PATH = '/database'

let routes: RouteConfig[] = [
    {
        path: PATH,
        component: Layout,
        routes: [
            {
                path: PATH,
                component: List,
                exact: true
            }
        ]
    }
]
export let App = () => renderRoutes(routes)
