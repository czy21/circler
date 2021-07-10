import React from "react";
import {Button, Col, Form, Input, Row, Space, Table} from "antd";
import api from "@/api"
import moment from "moment";
import {Detail as DetailModel} from "@v/volume/data";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";

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
            let d: DetailModel = data.items.map((t: any) => {
                return {
                    id: t.metadata.uid,
                    name: t.metadata.name,
                    phase: t.status.phase,
                    accessMode: t.status.accessModes.join(","),
                    createTime: moment(t.metadata.creationTimestamp).format("yyyy-MM-DD HH:mm:ss")
                }
            })
            this.setState({
                "data": d,
                "total": data.items.length
            })
        })
    }

    render() {
        return <div>

            <Form layout={"inline"}
                  style={{marginBottom: 20}}
            >
                <Row style={{width: "100%"}}>
                    <Col span={20}>
                        <Form.Item name="search">
                            <Input prefix={<SearchOutlined/>}/>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Space>
                            <Button type={"default"}>重置</Button>
                            <Button type={"primary"}>查询</Button>
                            <Button type={"primary"}><PlusOutlined/>新建</Button>
                        </Space>

                    </Col>
                </Row>
            </Form>
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