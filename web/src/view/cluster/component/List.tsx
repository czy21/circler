import React from "react";
import stub from "@/init"
import {UnControlled as CodeMirror} from "react-codemirror2";
import {PageModel} from "@/model/data";

const title = "集群"
const List: React.FC<any> = (props: any) => {
    const {history, route} = props

    const [data, setData] = stub.ref.react.useState([])
    const [createVisible, setCreateVisible] = stub.ref.react.useState(false)
    const [content, setContent] = stub.ref.react.useState("")
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

    const [createForm] = stub.ref.antd.Form.useForm();

    const handleSearch = (q?: any) => {
        setQuery(q)
        stub.api.post("k8s/cluster/search", stub.ref.lodash.omit(q, "total"))
            .then((data: any) => {
                setData(data.data)
                setPage(data.page)
            })
    }
    const handleShowCreateModal = () => {
        createForm.resetFields()
        setContent("")
        setCreateVisible(true)
    }
    const handleCreateOk = () => {
        const input = {...createForm.getFieldsValue(), content: content}
        stub.api.post("k8s/cluster/create", {"query": query, "form": input}).then((t: any) => {
            if (!t.error) {
                stub.ref.antd.message.info("添加成功")
            }
            setData(t.data)
            setCreateVisible(false)
        })
    };
    return (
        <div>
            <stub.component.Table title={title}
                                  datasource={data}
                                  columns={columns}
                                  page={page}
                                  onSearch={handleSearch}
                                  filters={filters}
            />
            <stub.component.Create title={`添加${title}`}
                                   visible={createVisible}
                                   onOk={handleCreateOk}
                                   onCancel={() => setCreateVisible(false)}>
                <stub.ref.antd.Form form={createForm}>
                    <stub.ref.antd.Form.Item label={"名称"} name={"name"} required={true}>
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"描述"} name={"description"}>
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"内容"}>
                        <CodeMirror
                            editorDidMount={(editor) => {
                                editor.setSize('auto', '400');
                            }}
                            value={content}
                            options={{
                                theme: 'material',
                                lineNumbers: true,
                                mode: {name: 'text/x-yaml'},
                                styleActiveLine: true,
                            }}
                            onChange={(editor, data, value) => setContent(value)}
                        >
                        </CodeMirror>
                    </stub.ref.antd.Form.Item>
                </stub.ref.antd.Form>
            </stub.component.Create>
        </div>
    )

}

export default List