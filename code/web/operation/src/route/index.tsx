import {RouteConfig} from "react-router-config";
import {App as Volume} from '@v/volume/App'
import {App as ConfigMap} from '@v/configmap/App'

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