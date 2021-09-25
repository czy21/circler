import React from "react";
import stub from "@/init";
import moment from "moment";
import {Detail as DetailModel} from "@v/volume/data";

export default class Detail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        stub.api.post("k8s/volume/detail", {name: this.props.match.params.name}).then((t: any) => {
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
                <stub.antd.Descriptions title={`${this.state.data?.name}`}>
                    <stub.antd.Descriptions.Item label={"状态"}>{this.state.data?.phase}</stub.antd.Descriptions.Item>
                    <stub.antd.Descriptions.Item label={"容量"}>{this.state.data?.capacity}</stub.antd.Descriptions.Item>
                    <stub.antd.Descriptions.Item label={"访问模式"}>{this.state.data?.accessMode}</stub.antd.Descriptions.Item>
                    <stub.antd.Descriptions.Item label={"存储类型"}>{this.state.data?.storageType}</stub.antd.Descriptions.Item>
                    <stub.antd.Descriptions.Item label={"创建时间"}>{this.state.data?.createTime}</stub.antd.Descriptions.Item>
                </stub.antd.Descriptions>
            </div>
        )
    }
}