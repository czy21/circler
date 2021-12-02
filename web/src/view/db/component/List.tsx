import React from "react";
import stub from "@/init"
import {PageModel} from "@/model/data";


const title = "集群"

const List: React.FC<any> = (props: any) => {
    const {history, route} = props

    const [data, setData] = stub.ref.react.useState([])
    const [createVisible, setBackupVisible] = stub.ref.react.useState(false)
    const [query, setQuery] = stub.ref.react.useState<any>({})
    const [page, setPage] = stub.ref.react.useState<PageModel>({})
    const [dbOptions, setDbOptions] = stub.ref.react.useState<any>([])
    const [dbSelectOptions, setBbSelectOptions] = stub.ref.react.useState<any>([])
    const [connectState, setConnectState] = stub.ref.react.useState<boolean>()
    const [option] = stub.ref.react.useState({
        "db": [
            {
                "label": "mysql",
                "value": "mysql"
            },
            {
                "label": "postgresql",
                "value": "postgresql"
            }
        ]
    })
    const [filters, setFilter] = stub.ref.react.useState([
        {
            "key": "name",
            "label": "名称"
        },
    ])

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
            key: 'description',
            header: '描述',
        },
        {
            key: 'operation',
            title: '操作',
            render: (text: any, record: any) => (
                <stub.ref.antd.Button icon={<stub.ref.icon.DashOutlined/>} type={"text"} style={{borderRadius: "16px"}}/>
            ),
            fixed: "right",
            width: 100
        },
    ];

    const [queryInstanceForm] = stub.ref.antd.Form.useForm();

    const handleSearch = (q?: any) => {
        setQuery(q)
        stub.api.post("database/backup/search", stub.ref.lodash.omit(q, "total"))
            .then((data: any) => {
                setData(data.data)
                setPage(data.page)
            })
    }
    const handleShowAddInstanceModal = () => {
        queryInstanceForm.resetFields()
        setBackupVisible(true)
    }
    const handleAddInstanceOk = async () => {
        try {
            const input = await queryInstanceForm.validateFields();
            stub.api.post("db/instance/add", input).then((t: any) => {
                setBackupVisible(false)
            })
        } catch (errorInfo) {

        }
    };

    const handleTestConnect = async () => {
        try {
            const input = await queryInstanceForm.validateFields();
            stub.api.post("db/listMeta", input).then((t: any) => {
                setConnectState(true)
            })
        } catch (errorInfo) {

        }
    }
    const onCheck = (checkedKeysValue: any) => {
        console.log('onCheck', checkedKeysValue);
    };

    const InstanceTable = () => {
        return (
            <stub.component.Table title={"实例列表"}
                                  datasource={data}
                                  columns={columns}
                                  page={page}
                                  onSearch={handleSearch}
                                  onShowCreateModal={handleShowAddInstanceModal}
                                  filters={filters}
            />
        )
    }

    const AddInstanceForm = () => {
        return (
            <stub.component.Create title={"添加实例"}
                                   width={600}
                                   visible={createVisible}
                                   onOk={handleAddInstanceOk}
                                   onCancel={() => setBackupVisible(false)}>
                <stub.ref.antd.Form form={queryInstanceForm}
                                    labelCol={{span: 8}}
                                    wrapperCol={{span: 10}}
                                    initialValues={{
                                        "host": "192.168.2.18",
                                        "port": "3306",
                                        "username": "root",
                                        "password": "Czy.190815"
                                    }}
                >
                    <stub.ref.antd.Form.Item label={"kind"} name={"kind"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Select options={option["db"]}/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"Host"} name={"host"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"Port"} name={"port"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"UserName"} name={"username"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"Password"} name={"password"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input.Password/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item {...{wrapperCol: {offset: 8}}}>
                        <stub.ref.antd.Space>
                            <stub.ref.antd.Button onClick={handleTestConnect}>Test</stub.ref.antd.Button>
                            {connectState && <stub.ref.icon.CheckCircleTwoTone twoToneColor={"#52c41a"}/>}
                        </stub.ref.antd.Space>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item>
                        <stub.ref.antd.Tree
                            height={300}
                            checkable
                            fieldNames={{"title": "label", "key": "value"}}
                            onCheck={onCheck}
                            // onSelect={onSelect}
                            // onCheck={onCheck}
                            treeData={dbOptions}
                        />
                    </stub.ref.antd.Form.Item>
                </stub.ref.antd.Form>
            </stub.component.Create>
        )
    }

    return (
        <div>
            {InstanceTable()}
            {AddInstanceForm()}
        </div>
    )

}

export default List