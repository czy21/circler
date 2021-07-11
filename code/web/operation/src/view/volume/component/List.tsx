import React from "react";
import {Button, Form as AntdForm, Input, Space} from "antd";
import api from "@/api"
import moment from "moment";
import {Detail as DetailModel, Search} from "@v/volume/data";
import {DashOutlined} from "@ant-design/icons";
import {Table} from '@/component'
import Create from '@c/Create'

const title: string = "存储卷"

export default class List extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.handleSearch()
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

    handleSearch = (query?: Search) => {
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
    handleCreateShow = () => {
        this.setState({
            createVisible: true
        })
    }
    handleCreateOk = () => {
        this.setState({
            createVisible: false
        })
    };

    handleCreateCancel = () => {
        this.setState({
            createVisible: false
        })
    };

    render() {
        return (
            <div>
                <Table title={title} onSearch={this.handleSearch} datasource={this.state.data} columns={this.columns} showCreateModal={this.handleCreateShow}/>
                <Create title={title} visible={this.state.createVisible} onOk={this.handleCreateOk} onCancel={this.handleCreateCancel}>
                    <AntdForm>
                        <AntdForm.Item label={"名称"} name={"name"}>
                            <Input/>
                        </AntdForm.Item>
                    </AntdForm>
                </Create>
            </div>
        )
    }
}