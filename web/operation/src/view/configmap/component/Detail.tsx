import React from "react";
import api from "@/api";
import moment from "moment";
import {Descriptions} from "antd";
import {Detail as DetailModel} from "@v/configmap/data";

export default class Detail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        api.post("k8s/configmap/detail", {name: this.props.match.params.name}).then((t: any) => {
            let data: DetailModel = {
                name: t.metadata.name,
                createTime: moment(t.metadata.creationTimestamp).format("yyyy-MM-DD HH:mm:ss")
            }
            this.setState({data: data})
        })
    }

    render() {
        return (
            <div>
                <Descriptions title={`${this.state.data?.name}`}>
                    <Descriptions.Item label={"创建时间"}>{this.state.data?.createTime}</Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}