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

    const [backupForm] = stub.ref.antd.Form.useForm();

    const handleSearch = (q?: any) => {
        setQuery(q)
        stub.api.post("database/backup/search", stub.ref.lodash.omit(q, "total"))
            .then((data: any) => {
                setData(data.data)
                setPage(data.page)
            })
    }
    const handleShowBackupModal = () => {
        backupForm.resetFields()
        setBackupVisible(true)
    }
    const handleBackupOk = () => {
        const input = {...backupForm.getFieldsValue()}
        console.log(input)
        // stub.api.post("database/backup/create", {"query": query, "form": input}).then((t: any) => {
        //     if (!t.error) {
        //         stub.ref.antd.message.info("添加成功")
        //     }
        //     setData(t.data)
        //     setBackupVisible(false)
        // })
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
                                   visible={createVisible}
                                   onOk={handleBackupOk}
                                   onCancel={() => setBackupVisible(false)}>
                <stub.ref.antd.Form form={backupForm}>
                    <stub.ref.antd.Form.Item label={"Host"} name={"host"} required={true}>
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"Port"} name={"port"} required={true}>
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"UserName"} name={"username"} required={true}>
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"Password"} name={"password"} required={true}>
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                </stub.ref.antd.Form>
            </stub.component.Create>
        </div>
    )

}

export default List