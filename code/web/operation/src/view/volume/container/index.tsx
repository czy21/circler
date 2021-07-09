import React from "react";
import {Space, Table} from "antd";
import api from "@/api"
import moment from "moment";

export default class Index extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    detail(record: any) {
        this.props.history.push(`${this.props.route.path}/detail/${record.name}`)
        api.post("k8s/volume/detail", {"name": ""}).then((data: any) => {
        })
    }

    columns = [
        {
            key: 'name',
            title: '名称',
            render: (text: any, record: any) => {
                return (
                    <Space>
                        <a onClick={() => this.detail(record)}>{record.name}</a>
                    </Space>)
            },
            fixed: "left"
        },
        {
            key: 'phase',
            title: '状态'
        },
        {
            key: 'accessMode',
            title: '访问模式',
        },
        {
            key: 'createTime',
            title: '创建时间',
        },
        {
            key: 'operation',
            title: '操作',
            render: (text: any, record: any) => (
                <Space size="middle">
                    <a>...</a>
                </Space>
            ),
            fixed: "right",
            width: 100
        },
    ];

    componentDidMount() {
        api.post("k8s/volume/list", {}).then((data: any) => {
            this.setState({
                "data": data.items.map((t: any) => {
                    return {
                        id: t.metadata.uid,
                        name: t.metadata.name,
                        phase: t.status.phase,
                        accessMode: t.status.accessModes.join(","),
                        createTime: moment(t.metadata.creationTimestamp).format("yyyy-MM-DD HH:mm:ss")
                    }
                }),
                "total": data.items.length
            })
        })
    }

    render() {
        return <div>
            <Table key={"volume"} columns={this.columns.map((t: any) => {
                let p = {
                    ...t,
                    dataIndex: t.key,
                }
                if (t.key !== "operation") {
                    p.width = t.width ?? 150
                }
                return p
            })} dataSource={this.state.data} pagination={{total: this.state.total, pageSize: 10, showTotal: (t: number) => `总数: ${t}`}}/>
        </div>
    }
}