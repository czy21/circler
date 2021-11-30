import Layout from '@/layout/Layout'
import List from '@v/db/component/List'
import {renderRoutes, RouteConfig} from "react-router-config";

const PATH = '/db'

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
