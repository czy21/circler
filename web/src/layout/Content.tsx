import stub from "@/init";
import React from "react";
import routes from "@/route";
import {renderRoutes} from "react-router-config";


export default class Content extends React.Component<any, any> {
    render() {
        return (
            <stub.ref.antd.Layout.Content className="content">
                {renderRoutes(routes)}
            </stub.ref.antd.Layout.Content>
        )
    }
}