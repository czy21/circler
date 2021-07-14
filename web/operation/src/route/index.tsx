import {RouteConfig} from "react-router-config";
import {App as Volume} from '@/route/index'
import {App as ConfigMap} from '@/route/index'

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