import React from 'react'

import {renderRoutes} from 'react-router-config'

export default class AppsLayout extends React.Component<any, any> {
    render() {
        return (
            <div>{renderRoutes(this.props.route.routes)}</div>
        )
    }
}
