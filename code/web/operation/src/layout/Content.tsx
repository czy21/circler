import React from "react";
import {Layout} from "antd";
import routes, {RouteModel} from '../route'
import {Route} from 'react-router-dom'

const AntdContent = Layout.Content;

function recursionRoute(routes: RouteModel[]) {
    let retRoutes: RouteModel[] = [];
    routes.forEach(s => {
        if (s.children) {
            const copyChildren: RouteModel[] = s.children.map(c => {
                let t: RouteModel = {
                    name: c.name,
                    path: s.path + c.path,
                    icon: c.icon,
                    component: c.component,
                };
                if (c.children) {
                    t.children = c.children
                }
                return t;
            });
            retRoutes = retRoutes.concat(recursionRoute(copyChildren))
        } else {
            retRoutes.push(s)
        }
    });
    return retRoutes;
}


export default class Content extends React.Component<any, any> {
    render() {
        return (
            <AntdContent className="content">
                {recursionRoute(routes).map((s, i) => <Route key={i} path={s.path} component={s.component}/>)}
            </AntdContent>
        )
    }
}