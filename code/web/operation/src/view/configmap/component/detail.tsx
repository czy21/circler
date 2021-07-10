import React from "react";
import api from "@/api";
import moment from "moment";
import {Descriptions} from "antd";
import {DetailModel as DetailModel} from "@v/volume/data";

export default class Detail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        api.post("k8s/volume/detail", {name: this.props.match.params.name}).then((t: any) => {
            let data: DetailModel = {
                name: t.metadata.name,
                phase: t.status.phase,
                accessMode: t.status.accessModes.join(","),
                capacity: t.status.capacity.storage,
                storageType: t.spec.storageClassName,
                createTime: moment(t.metadata.creationTimestamp).format("yyyy-MM-DD HH:mm:ss")
            }
            this.setState({data: data})
        })
    }

    render() {
        return (
            <div>
                <Descriptions title={`${this.state.data?.name}`}>
                    <Descriptions.Item label={"状态"}>{this.state.data?.phase}</Descriptions.Item>
                    <Descriptions.Item label={"容量"}>{this.state.data?.capacity}</Descriptions.Item>
                    <Descriptions.Item label={"访问模式"}>{this.state.data?.accessMode}</Descriptions.Item>
                    <Descriptions.Item label={"存储类型"}>{this.state.data?.storageType}</Descriptions.Item>
                    <Descriptions.Item label={"创建时间"}>{this.state.data?.createTime}</Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}