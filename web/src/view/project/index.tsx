import Layout from '@/layout/Layout'
import {default as ProjectList} from '@v/project/component/List'
import {renderRoutes, RouteConfig} from "react-router-config";

const PATH = '/project'

let routes: RouteConfig[] = [
    {
        path: PATH,
        component: Layout,
        routes: [
            {
                path: PATH,
                component: ProjectList,
                exact: true
            }
        ]
    }
]
export let App = () => renderRoutes(routes)
