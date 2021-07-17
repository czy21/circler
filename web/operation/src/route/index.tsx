import {RouteConfig} from "react-router-config";
import {App as Volume} from '@v/volume'
import {App as ConfigMap} from '@v/configmap'

const routes: RouteConfig[] = [
    {
        path: "/volume",
        component: Volume,
    },
    {
        path: "/configmap",
        component: ConfigMap,
    },
];
export default routes