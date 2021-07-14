import Layout from '@/layout/Layout'
import List from '@v/configmap/component/List'
import Detail from "@v/configmap/component/Detail";
import {renderRoutes, RouteConfig} from "react-router-config";

const PATH = '/configmap'

let routes: RouteConfig[] = [
    {
        path: PATH,
        component: Layout,
        routes: [
            {
                path: PATH,
                component: List,
                exact: true
            },
            {
                path: `${PATH}/:name`,
                component: Detail,
                exact: true
            }
        ]
    }
]
export let App = () => renderRoutes(routes)