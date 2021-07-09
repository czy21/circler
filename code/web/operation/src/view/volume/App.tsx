import {renderRoutes} from "react-router-config";
import routes from "@/route";
import Index from '@v/volume/container'
import {Redirect} from 'react-router-dom'

routes = [
    {
        path: "/",
        component: ()=>{return (<div/>)},
        // exact: true
    }
]

const App = () => renderRoutes(routes)
export default App