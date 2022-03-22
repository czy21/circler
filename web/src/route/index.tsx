import {RouteConfig} from "react-router-config";
// import {App as Volume} from '@v/volume'
// import {App as ConfigMap} from '@v/configmap'
// import {App as Project} from '@v/project'
// import {App as Cluster} from '@v/cluster'
import {App as DB} from '@v/db'
import {App as USER} from '@v/user'
import {App as PROJECT} from '@v/project'

const routes: RouteConfig[] = [
    // {
    //     path: "/volume",
    //     component: Volume,
    // },
    // {
    //     path: "/configmap",
    //     component: ConfigMap,
    // },
    // {
    //     path: "/project",
    //     component: Project,
    // },
    // {
    //     path: "/cluster",
    //     component: Cluster,
    // },
    {
        path: "/db",
        component: DB,
    },
    {
        path: "/user",
        component: USER,
    },
    // {
    //     path: "/project",
    //     component: PROJECT
    // }
];
export default routes