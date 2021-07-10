import React from 'react'

import {renderRoutes} from 'react-router-config'

export default class AppsLayout extends React.Component<any, any> {
    render() {
        const {route} = this.props
        return (
            <div>{renderRoutes(route.routes)}</div>
        )
    }
}
