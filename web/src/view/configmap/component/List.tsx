import React from "react";
import stub from "@/init"
import {Search} from "@/model/data";

const title = "配置"
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
            key: 'createTime',
            title: '创建时间',
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

    const [createForm] = stub.ref.antd.Form.useForm();

    const handleSearch = (query?: Search) => {
        stub.api.post("k8s/configmap/list", query).then((data: any) => {
            let d: any = data.items.map((t: any) => stub.util.mapper.configmap(t))
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
    return (
        <div>
            <stub.component.Table title={title}
                                  onSearch={handleSearch}
                                  datasource={data}
                                  columns={columns}
            />
            <stub.component.Create title={`创建${title}`} visible={createVisible} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                <stub.ref.antd.Form form={createForm}>
                    <stub.ref.antd.Form.Item label={"名称"} name={"name"} required={true}>
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>

                </stub.ref.antd.Form>
            </stub.component.Create>
        </div>
    )

}

export default List