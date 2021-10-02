import React from "react";
import stub from "@/init"
import {Search} from "@/model/data";
import {UnControlled as CodeMirror} from "react-codemirror2";

const title = "集群"
const List: React.FC<any> = (props: any) => {
    const {history, route} = props

    const [data, setData] = stub.ref.react.useState([])
    const [page, setPage] = stub.ref.react.useState({pageCurrent: 1, pageSize: 10, total: 0})
    const [createVisible, setCreateVisible] = stub.ref.react.useState(false)
    const [content, setContent] = stub.ref.react.useState("")

    const [filter, setFilter] = stub.ref.react.useState([
        {
            "key": "name",
            "label": "姓名"
        },
        {
            "key": "age",
            "label": "年龄"
        }
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
            title: '描述',
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
        stub.api.post("k8s/cluster/list", query).then((data: any) => {
            setData(data.data)
        })
    }
    const handleCreateShow = () => {
        createForm.resetFields()
        setContent("")
        setCreateVisible(true)
    }
    const handleCreateOk = () => {
        const input = {...createForm.getFieldsValue(), content: content}
        stub.api.post("k8s/cluster/create", input).then((t: any) => {
            if (!t.error) {
                stub.ref.antd.message.info("添加成功")
            }
            setCreateVisible(false)
        })
    };
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
                                  filter={filter}
            />
            <stub.component.Create title={`添加${title}`}
                                   visible={createVisible}
                                   onOk={handleCreateOk}
                                   onCancel={() => setCreateVisible(false)}>
                <stub.ref.antd.Form form={createForm}>
                    <stub.ref.antd.Form.Item label={"名称"} name={"name"} required={true}>
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"描述"} name={"description"} required={true}>
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