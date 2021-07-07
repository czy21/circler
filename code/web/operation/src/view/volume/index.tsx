import React from "react";
import {Table} from "antd";
import api from "@/api"
import moment from "moment";

const columns = [
    {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '状态',
        dataIndex: 'phase',
        key: 'phase',
    },
    {
        title: '访问模式',
        dataIndex: 'accessMode',
        key: 'accessMode',
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
    },
];

export default class Index extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        api.post("k8s/volume/list", {}).then((data: any) => {
            this.setState({
                "data": data.items.map((t: any) => {
                    return {
                        name: t.metadata.name,
                        phase: t.status.phase,
                        accessMode: t.status.accessModes.join(","),
                        createTime: moment(t.metadata.creationTimestamp).format("yyyy-MM-DD HH:mm:ss")
                    }
                })
            })
        })
    }

    render() {
        return <Table columns={columns} dataSource={this.state.data}/>

    }
}