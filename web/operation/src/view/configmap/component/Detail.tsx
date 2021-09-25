import React from "react";
import stub from "@/init";
import {Detail as DetailModel} from "../data";

export default class Detail extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        stub.api.post("k8s/configmap/detail", {name: this.props.match.params.name}).then((t: any) => {
            let data: DetailModel = {
                name: t.metadata.name,
                createTime: stub.ref.moment(t.metadata.creationTimestamp).format("yyyy-MM-DD HH:mm:ss")
            }
            this.setState({data: data})
        })
    }

    render() {
        return (
            <div>
                <stub.ref.antd.Descriptions title={`${this.state.data?.name}`}>
                    <stub.ref.antd.Descriptions.Item label={"创建时间"}>{this.state.data?.createTime}</stub.ref.antd.Descriptions.Item>
                </stub.ref.antd.Descriptions>
            </div>
        )
    }
}