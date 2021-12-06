import React from 'react'

import {renderRoutes} from 'react-router-config'

const Layout: React.FC<any> = (props: any) => {
    return (
        <div>{renderRoutes(props.route.routes)}</div>
    )
}
export default Layout