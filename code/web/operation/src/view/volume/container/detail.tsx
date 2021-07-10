import React from "react";
import api from "@/api";
import moment from "moment";
import {Descriptions} from "antd";


export default class Detail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        api.post("k8s/volume/detail", {name: this.props.match.params.name}).then((t: any) => {
            this.setState({
                data: {
                    name: t.metadata.name,
                    phase: t.status.phase,
                    accessMode: t.status.accessModes.join(","),
                }
            })
        })
    }

    render() {
        return (
            <Descriptions title={this.state.data?.name}>
                <Descriptions.Item label={"状态"}>{this.state.data?.phase}</Descriptions.Item>
                <Descriptions.Item label={"访问模式"}>{this.state.data?.accessMode}</Descriptions.Item>
            </Descriptions>
        )
    }
}