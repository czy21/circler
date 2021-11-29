import {RouteConfig} from "react-router-config";
import {App as Volume} from '@v/volume'
import {App as ConfigMap} from '@v/configmap'
import {App as Project} from '@v/project'
import {App as Cluster} from '@v/cluster'
import {App as Database} from '@v/database'

const routes: RouteConfig[] = [
    {
        path: "/volume",
        component: Volume,
    },
    {
        path: "/configmap",
        component: ConfigMap,
    },
    {
        path: "/project",
        component: Project,
    },
    {
        path: "/cluster",
        component: Cluster,
    },
    {
        path: "/database",
        component: Database,
    },
];
export default routes