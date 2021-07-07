import Volume from "@v/volume"
import ConfigMap from "@v/configmap"
import {RouteConfig} from "react-router-config";

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