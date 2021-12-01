import React from "react";
import stub from "@/init"
import {PageModel, Search} from "@/model/data";
import {Button} from "antd";


const title = "集群"

const List: React.FC<any> = (props: any) => {
    const {history, route} = props

    const [data, setData] = stub.ref.react.useState([])
    const [createVisible, setBackupVisible] = stub.ref.react.useState(false)
    const [query, setQuery] = stub.ref.react.useState<any>({})
    const [page, setPage] = stub.ref.react.useState<PageModel>({})
    const [dbOptions, setDbOptions] = stub.ref.react.useState<any>([])
    const [dbSelectOptions, setBbSelectOptions] = stub.ref.react.useState<any>([])

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
    const handleShowBackupModal = () => {
        queryInstanceForm.resetFields()
        setBackupVisible(true)
    }
    const handleBackupOk = async () => {
        try {
            const input = await queryInstanceForm.validateFields();
            console.log(input)
            // stub.api.post("database/createBackup", input).then((t: any) => {
            //     if (!t.error) {
            //         stub.ref.antd.message.info("添加成功")
            //     }
            //     setData(t.data)
            //     setBackupVisible(false)
            // })
        } catch (errorInfo) {

        }
    };

    const handleTest = async () => {
        try {
            const input = await queryInstanceForm.validateFields();
            stub.api.post("db/listMeta", input).then((t: any) => {
                setDbOptions(t.data.map((t: any) => {
                    const tables = t.tables.map((p: any) => {
                        return {label: p.name, value: p.name}
                    })
                    return {
                        label: t.name, value: t.name, children: tables
                    }
                }))
            })
        } catch (errorInfo) {

        }
    }
    const onCheck = (checkedKeysValue:any) => {
        console.log('onCheck', checkedKeysValue);
    };
    return (
        <div>
            <stub.component.Table title={title}
                                  datasource={data}
                                  columns={columns}
                                  page={page}
                                  onSearch={handleSearch}
                                  filters={filters}
                                  actions={[
                                      <Button onClick={handleShowBackupModal}>备份</Button>
                                  ]}
            />
            <stub.component.Create title={`备份${title}`}
                                   width={600}
                                   visible={createVisible}
                                   onOk={handleBackupOk}
                                   onCancel={() => setBackupVisible(false)}>
                <stub.ref.antd.Form form={queryInstanceForm}
                                    labelCol={{span: 8}}
                                    wrapperCol={{span: 10}}
                                    layout="horizontal"
                                    initialValues={{
                                        "host": "192.168.2.18",
                                        "port": "3306",
                                        "username": "root",
                                        "password": "Czy.190815"
                                    }}
                >
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
                        <stub.ref.antd.Button onClick={handleTest}>Test</stub.ref.antd.Button>
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
        </div>
    )

}

export default List