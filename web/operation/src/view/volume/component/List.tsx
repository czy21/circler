import React from "react";
import stub from "@/init"
import {Search} from "@v/volume/data";
import Modal from '@c/Modal'
import {DashOutlined} from "@ant-design/icons";
import {UnControlled as CodeMirror} from 'react-codemirror2'

const title: string = "存储卷"
const List: React.FC<any> = (props: any) => {
    const {history, route} = props
    const [pocket] = stub.ref.react.useState({
        volumeAccessMode: [
            {label: 'ReadWriteOnce 单个节点读写', value: 'ReadWriteOnce'},
            {label: 'ReadOnlyMany  多节点只读', value: 'ReadOnlyMany'},
            {label: 'ReadWriteMany 多节点读写', value: 'ReadWriteMany'},
        ]
    })

    const [data, setData] = stub.ref.react.useState([])
    const [page, setPage] = stub.ref.react.useState({pageCurrent: 1, pageSize: 10, total: 0})
    const [createVisible, setCreateVisible] = stub.ref.react.useState(false)
    const [editVisible, setEditVisible] = stub.ref.react.useState(false)
    const [capacity, setCapacity] = stub.ref.react.useState(0)
    const [yaml, setYaml] = stub.ref.react.useState("")

    stub.ref.react.useEffect(() => {
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
                <stub.ref.antd.List
                    size={"small"}
                    dataSource={[record]}
                    renderItem={(item: any, index: number) => {
                        return (
                            <stub.ref.antd.List.Item
                                actions={[
                                    <stub.ref.antd.Dropdown
                                        trigger={["click"]}
                                        overlay={
                                            <stub.ref.antd.Menu onClick={({key}) => editAndDelete(key, item)}>
                                                <stub.ref.antd.Menu.Item key="edit">编辑</stub.ref.antd.Menu.Item>
                                                <stub.ref.antd.Menu.Item key="editConfig">编辑配置文件</stub.ref.antd.Menu.Item>
                                                <stub.ref.antd.Menu.Item key="delete">删除</stub.ref.antd.Menu.Item>
                                            </stub.ref.antd.Menu>
                                        }
                                    >
                                        <stub.ref.antd.Button size={"small"} icon={<DashOutlined/>} type={"text"} style={{borderRadius: "16px"}}/>
                                    </stub.ref.antd.Dropdown>
                                ]}>
                            </stub.ref.antd.List.Item>
                        )
                    }}
                />
            )
        },
    ];

    const [createForm] = stub.ref.antd.Form.useForm();

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
            stub.ref.antd.Modal.confirm({
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
            <stub.component.Table title={title}
                   onSearch={handleSearch}
                   datasource={data}
                   pageCurrent={page.pageCurrent}
                   pageSize={page.pageSize}
                   total={page.total}
                   columns={columns}
                   showCreateModal={handleCreateShow}
            />
            <Modal title={`创建${title}`} visible={createVisible} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                <stub.ref.antd.Form form={createForm}>
                    <stub.ref.antd.Form.Item label={"名称"} name={"name"} required={true}>
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"访问模式"} name={"accessMode"} required={true}>
                        <stub.ref.antd.Radio.Group options={pocket.volumeAccessMode} optionType={"button"} buttonStyle={"outline"}/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"容量"} name={"capacity"} required={true}>
                        <stub.ref.antd.Row justify={"space-between"}>
                            <stub.ref.antd.Col span={20}>
                                <stub.ref.antd.Slider defaultValue={capacity}
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
                            </stub.ref.antd.Col>
                            <stub.ref.antd.Col style={{display: "flex", alignItems: "center"}}>
                                <stub.ref.antd.InputNumber
                                    step={10}
                                    onChange={(val) => {
                                        setCapacity(val)
                                    }}
                                    value={capacity}
                                />
                            </stub.ref.antd.Col>
                        </stub.ref.antd.Row>
                    </stub.ref.antd.Form.Item>
                </stub.ref.antd.Form>
            </Modal>
            <Modal title={`编辑配置文件`}
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
            </Modal>
        </div>
    )
}
export default List