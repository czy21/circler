import React, {useEffect, useState} from "react";
import {Button, Col, Dropdown, Form as AntdForm, Input, InputNumber, List as AntdList, Menu, Modal, Radio, Row, Slider} from "antd";
import stub from "@/init"
import {Search} from "@v/volume/data";
import {Table} from '@c/index'
import Create from '@c/Create'
import {DashOutlined} from "@ant-design/icons";
import {UnControlled as CodeMirror} from 'react-codemirror2'

const title: string = "存储卷"
const List: React.FC<any> = (props: any) => {
    const {history, route} = props
    const [pocket] = useState({
        volumeAccessMode: [
            {label: 'ReadWriteOnce 单个节点读写', value: 'ReadWriteOnce'},
            {label: 'ReadOnlyMany  多节点只读', value: 'ReadOnlyMany'},
            {label: 'ReadWriteMany 多节点读写', value: 'ReadWriteMany'},
        ]
    })

    const [data, setData] = useState([])
    const [page, setPage] = useState({pageCurrent: 1, pageSize: 10, total: 0})
    const [createVisible, setCreateVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [capacity, setCapacity] = useState(0)
    const [yaml, setYaml] = useState("")

    useEffect(() => {
        handleSearch()
    }, [])

    const columns = [
        {
            key: 'name',
            header: '名称',
            render: (text: any, record: any) => {
                return (
                    <a onClick={() => {
                        history.push(`${route.path}/${record.name}`)
                    }}>{record.name}</a>
                )
            }
        },
        {
            key: 'phase',
            header: '状态'
        },
        {
            key: 'accessMode',
            header: '访问模式',
        },
        {
            key: 'createTime',
            header: '创建时间',
        },
        {
            key: 'operation',
            header: '操作',
            render: (text: any, record: any) => (
                <AntdList
                    size={"small"}
                    dataSource={[record]}
                    renderItem={(item: any, index: number) => {
                        return (
                            <AntdList.Item
                                actions={[
                                    <Dropdown
                                        trigger={["click"]}
                                        overlay={
                                            <Menu onClick={({key}) => editAndDelete(key, item)}>
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
            )
        },
    ];

    const [createForm] = AntdForm.useForm();

    const handleSearch = (query?: Search) => {
        stub.api.post("k8s/volume/list", query).then((data: any) => {
            let d: any = data.items.map((t: any) => stub.util.mapper.volume(t))
            setData(d)
            setPage({
                pageCurrent: 1,
                pageSize: 10,
                total: d.length
            })
        })
    }
    const handleCreateShow = () => {
        createForm.resetFields()
        setCreateVisible(true)
        setCapacity(128)
    }
    const handleCreateOk = () => {
        setCreateVisible(false)
        createForm.setFieldsValue({
            capacity: capacity
        })
        stub.api.post("k8s/volume/create", createForm.getFieldsValue()).then(() => {

        })
    };
    const handleCreateCancel = () => {
        setCreateVisible(false)
    };

    const editAndDelete = (key: string | number, currentItem: any) => {
        if (key === 'edit') {
        } else if (key === 'editConfig') {
            handleEditShow()
            stub.api.post("k8s/volume/detail", {name: currentItem.name}).then((t: any) => {
                let yamlConfig: any = stub.util.mapper.volume(t)._originData
                setYaml(stub.util.yaml.getValue(yamlConfig))
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
    const handleEditShow = () => {
        setEditVisible(true)
    }
    const handleEditOk = () => {
        setEditVisible(false)
        stub.api.post("k8s/volume/editYaml", {yaml: yaml}).then(() => {

        })
    }
    return (
        <div>
            <Table title={title}
                   onSearch={handleSearch}
                   datasource={data}
                   pageCurrent={page.pageCurrent}
                   pageSize={page.pageSize}
                   total={page.total}
                   columns={columns}
                   showCreateModal={handleCreateShow}
            />
            <Create title={`创建${title}`} visible={createVisible} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                <AntdForm form={createForm}>
                    <AntdForm.Item label={"名称"} name={"name"} required={true}>
                        <Input/>
                    </AntdForm.Item>
                    <AntdForm.Item label={"访问模式"} name={"accessMode"} required={true}>
                        <Radio.Group options={pocket.volumeAccessMode} optionType={"button"} buttonStyle={"outline"}/>
                    </AntdForm.Item>
                    <AntdForm.Item label={"容量"} name={"capacity"} required={true}>
                        <Row justify={"space-between"}>
                            <Col span={20}>
                                <Slider defaultValue={capacity}
                                        marks={{
                                            128: "128Gi",
                                            512: "512Gi",
                                            1024: "1024Gi",
                                            2048: "2048Gi",
                                        }}
                                        max={2048}
                                        onChange={(val) => {
                                            setCapacity(val)
                                        }}
                                        value={capacity}
                                />
                            </Col>
                            <Col style={{display: "flex", alignItems: "center"}}>
                                <InputNumber
                                    step={10}
                                    onChange={(val) => {
                                        setCapacity(val)
                                    }}
                                    value={capacity}
                                />
                            </Col>
                        </Row>
                    </AntdForm.Item>
                </AntdForm>
            </Create>
            <Create title={`编辑配置文件`}
                    width={1200}
                    visible={editVisible}
                    onOk={handleEditOk}
                    onCancel={() => {
                        setEditVisible(false)
                    }}
            >
                <CodeMirror
                    editorDidMount={(editor) => {
                        editor.setSize('auto', '600');
                    }}
                    value={yaml}
                    options={{
                        theme: 'material',
                        lineNumbers: true,
                        mode: {name: 'text/x-yaml',},
                        styleActiveLine: true,
                    }}
                    onChange={(editor, data, value) => {
                        setYaml(value)
                    }}
                >
                </CodeMirror>
            </Create>
        </div>
    )
}
export default List