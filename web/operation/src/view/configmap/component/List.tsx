import React from "react";
import {Button} from "antd";
import api from "@/api"
import moment from "moment";
import {Detail as DetailModel, Search} from "@v/configmap/data";
import {DashOutlined} from "@ant-design/icons";
import {Table} from '@c/index'

const title = "配置"

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
                    <a onClick={() => {
                        this.props.history.push(`${this.props.route.path}/${text}`)
                    }}>{record.name}</a>
                )
            },
            fixed: "left"
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
        api.post("k8s/configmap/list", query).then((data: any) => {
            let d: DetailModel[] = data.items.map((t: any) => {
                return {
                    id: t.metadata.uid,
                    name: t.metadata.name,
                    createTime: moment(t.metadata.creationTimestamp).format("yyyy-MM-DD HH:mm:ss")
                }
            })
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
            <Table title={title} onSearch={this.handleSearch} datasource={this.state.data} columns={this.columns}/>
        )
    }
}