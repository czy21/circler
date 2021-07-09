import ConfigMap from "@v/configmap"
import {RouteConfig} from "react-router-config";
import {App as Volume} from '@v/volume/App'

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