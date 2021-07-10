import React from 'react'
import {renderRoutes, RouteConfig} from "react-router-config";
import {List, Detail, Layout} from '@v/configmap/component'


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
