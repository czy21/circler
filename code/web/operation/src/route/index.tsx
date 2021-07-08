import Volume from "@v/volume"
import ConfigMap from "@v/configmap"
import {RouteConfig} from "react-router-config";
import {default as VolumeDetail} from "@v/volume/detail"

const routes: RouteConfig[] = [
    {
        path: "/volume",
        component: Volume,
        routes: [
            {
                path: "/volume/detail",
                component: VolumeDetail
            }
        ]
    },
    {
        path: "/configmap",
        component: ConfigMap,
    },
];
export default routes