import React from 'react'
import {renderRoutes, RouteConfig} from "react-router-config";
import Index from '@v/volume/container/index'
import Detail from "@v/volume/container/detail";
import Layout from "@v/volume/container/layout";


const PATH = '/volume'

let routes: RouteConfig[] = [
    {
        path: PATH,
        component: Layout,
        routes: [
            {
                path: PATH,
                component: Index,
                exact: true
            },
            {
                path: `${PATH}/detail/:name`,
                component: Detail,
                exact: true
            }
        ]
    }
]
export let App = () => renderRoutes(routes)
