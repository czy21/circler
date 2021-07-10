import React from "react";
import {Button, Space} from "antd";
import api from "@/api"
import moment from "moment";
import {DetailModel as DetailModel, SearchModel} from "@v/volume/data";
import {DashOutlined} from "@ant-design/icons";
import {Table} from '@/component'


export default class List extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    columns = [
        {
            key: 'name',
            title: '名称',
            render: (text: any, record: any) => {
                return (
                    <Space>
                        <a onClick={() => {
                            this.props.history.push(`${this.props.route.path}/${record.name}`)
                        }}>{record.name}</a>
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
                <Button icon={<DashOutlined/>} type={"text"} style={{borderRadius: "16px"}}/>
            ),
            fixed: "right",
            width: 100
        },
    ];

    handleSearch = (query?: SearchModel) => {
        api.post("k8s/volume/list", query).then((data: any) => {
            let d: DetailModel[] = data.items.map((t: any) => {
                return {
                    id: t.metadata.uid,
                    name: t.metadata.name,
                    phase: t.status.phase,
                    accessMode: t.status.accessModes.join(","),
                    createTime: moment(t.metadata.creationTimestamp).format("yyyy-MM-DD HH:mm:ss")
                }
            })
            console.log()
            this.setState({
                "data": d,
                "total": d.length
            })
        })
    }

    componentDidMount() {
        this.handleSearch()
    }

    render() {
        return (
            <Table onSearch={this.handleSearch} datasource={this.state.data} columns={this.columns}/>
        )
    }
}