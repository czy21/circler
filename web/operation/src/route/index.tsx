import {RouteConfig} from "react-router-config";
import {App as Volume} from '@v/volume'
import {App as ConfigMap} from '@v/configmap'
import {App as Project} from '@v/project'

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
];
export default routes