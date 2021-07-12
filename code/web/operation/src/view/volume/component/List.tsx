import React from "react";
import {Button, Col, Dropdown, Form as AntdForm, FormInstance, Input, InputNumber, List as AntdList, Menu, Modal, Radio, Row, Slider, Space} from "antd";
import api from "@/api"
import moment from "moment";
import {Detail as DetailModel, Search} from "@v/volume/data";
import {Table} from '@/component'
import Create from '@c/Create'
import {CheckboxOptionType} from "antd/lib/checkbox/Group";
import {DashOutlined} from "@ant-design/icons";
import {UnControlled as CodeMirror} from 'react-codemirror2'

import {objectMapper, yaml} from '@/utils'

const title: string = "存储卷"

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
                <AntdList
                    size={"small"}
                    rowKey="id"
                    dataSource={[record]}
                    renderItem={(item: any, index: number) => {
                        return (
                            <AntdList.Item
                                actions={[
                                    <Dropdown
                                        trigger={["click"]}
                                        overlay={
                                            <Menu onClick={({key}) => this.editAndDelete(key, item)}>
                                                <Menu.Item key="edit">编辑</Menu.Item>
                                                <Menu.Item key="editConfig">编辑配置文件</Menu.Item>
                                                <Menu.Item key="delete">删除</Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button size={"small"} icon={<DashOutlined/>} type={"text"} style={{borderRadius: "16px"}}/>
                                    </Dropdown>
                                ]}>
                            </AntdList.Item>
                        )
                    }}
                        />

                        ),
                        fixed: "right",
                        width: 100
                    },
    ];

    createFormRef = React.createRef<FormInstance>();

    componentDidMount() {
        let accessModeOptions: CheckboxOptionType[] = [
            {label: 'ReadWriteOnce 单个节点读写', value: 'ReadWriteOnce'},
            {label: 'ReadOnlyMany  多节点只读', value: 'ReadOnlyMany'},
            {label: 'ReadWriteMany 多节点读写', value: 'ReadWriteMany'},
        ]
        this.setState({
            options: accessModeOptions
        })

        this.handleSearch()
    }

    handleSearch = (query?: Search) => {
        api.post("k8s/volume/list", query).then((data: any) => {
            let d: DetailModel[] = data.items.map((t: any) => objectMapper.volumes(t))
            this.setState({
                "data": d,
                "total": d.length
            })
        })
    }
    handleCreateShow = () => {
        this.createFormRef.current?.resetFields()
        this.setState({
            createVisible: true,
            capacity: 128
        })
    }
    handleCreateOk = () => {
        this.setState({
            createVisible: false
        })
        this.createFormRef.current?.setFieldsValue({
            capacity: this.state.capacity
        })
        api.post("k8s/volume/create", this.createFormRef.current?.getFieldsValue()).then(() => {

        })
    };
    handleCreateCancel = () => {
        this.setState({
            createVisible: false
        })

    };

    editAndDelete = (key: string | number, currentItem: any) => {
        if (key === 'edit') {
        } else if (key === 'editConfig') {
            this.handleEditShow()
            api.post("k8s/volume/detail", {name: currentItem.name}).then((t: any) => {
                let yamlConfig: any = objectMapper.volumes(t)._originData
                this.setState({
                    currentRowYaml: yaml.getValue(yamlConfig)
                })
            })

        } else if (key === 'delete') {
            Modal.confirm({
                title: '删除任务',
                content: '确定删除该任务吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                },
            });
        }
    };
    handleEditShow = () => {
        this.setState({
            editVisible: true
        })
    }
    handleEditOk = () => {
        this.setState({
            editVisible: false
        })
    }

    render() {
        return (
            <div>
                <Table title={title} onSearch={this.handleSearch} datasource={this.state.data} columns={this.columns} showCreateModal={this.handleCreateShow}/>
                <Create title={`创建${title}`} visible={this.state.createVisible} onOk={this.handleCreateOk} onCancel={this.handleCreateCancel}>
                    <AntdForm ref={this.createFormRef}>
                        <AntdForm.Item label={"名称"} name={"name"}>
                            <Input/>
                        </AntdForm.Item>
                        <AntdForm.Item label={"访问模式"} name={"accessMode"}>
                            <Radio.Group options={this.state.options} optionType={"button"} buttonStyle={"outline"}/>
                        </AntdForm.Item>
                        <AntdForm.Item label={"容量"} name={"capacity"}>
                            <Row justify={"space-between"}>
                                <Col span={20}>
                                    <Slider defaultValue={this.state.capacity}
                                            marks={{
                                                128: "128Gi",
                                                512: "512Gi",
                                                1024: "1024Gi",
                                                2048: "2048Gi",
                                            }}
                                            max={2048}
                                            onChange={(val) => {
                                                this.setState({
                                                    capacity: val
                                                })
                                            }}
                                            value={this.state.capacity}
                                    />
                                </Col>
                                <Col style={{display: "flex", alignItems: "center"}}>
                                    <InputNumber
                                        step={10}
                                        onChange={(val) => {
                                            this.setState({
                                                capacity: val
                                            })
                                        }}
                                        value={this.state.capacity}
                                    />
                                </Col>
                            </Row>
                        </AntdForm.Item>
                    </AntdForm>
                </Create>
                <Create title={`编辑配置文件`}
                        width={1200}
                        visible={this.state.editVisible}
                        onOk={this.handleEditOk}
                        onCancel={() => {
                            this.setState({
                                editVisible: false
                            })
                        }}
                >
                    <CodeMirror
                        editorDidMount={(editor) => {
                            editor.setSize('auto', '600');
                        }}
                        value={this.state.currentRowYaml}
                        options={{
                            theme: 'material',
                            lineNumbers: true,
                            mode: {name: 'text/x-yaml',},
                            styleActiveLine: true,
                        }}
                    >
                    </CodeMirror>
                </Create>
            </div>
        )
    }
}