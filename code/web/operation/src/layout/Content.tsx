import React from "react";
import {Layout} from "antd";
import routes from "@/route";
import {renderRoutes} from "react-router-config";

const AntdContent = Layout.Content;


export default class Content extends React.Component<any, any> {
    render() {
        return (
            <AntdContent className="content">
                {renderRoutes(routes)}
            </AntdContent>
        )
    }
}