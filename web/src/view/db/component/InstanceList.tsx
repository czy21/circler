import stub from "@/init"
import React from "react";
import InstanceAdd from "./InstanceAdd"

const InstanceList: React.FC<any> = (props: any) => {

    const [data, setData] = stub.ref.react.useState<any>({})
    const [query, setQuery] = stub.ref.react.useState<any>()

    stub.ref.react.useEffect(() => {
        stub.store.dispatch(stub.reducer.action.option.fetch(["dbInstanceKind", "genderKind"]))
        handleSearch()
    }, [])
    const operationMenus = [
        {
            key: "backup",
            label: <stub.ref.intl.FormattedMessage id={"a.b"} defaultMessage={"备份"}/>,
            onClick: (text: any, record: any) => {
                console.log(record)
            }
        }
    ]
    const columns = [
        {
            key: 'name',
            header: '名称',
            render: (text: any, record: any) => {
                return (
                    <a onClick={() => {
                        props.history.push(`${props.route.path}/${record.name}`)
                    }}>{record.name}</a>
                )
            }
        },
        {
            key: 'host',
            header: 'Host',
        },
        {
            key: 'port',
            header: 'Port',
        },
        {
            key: 'username',
            header: 'UserName',
        },
        {
            key: 'password',
            header: 'Password',
            render: (text: any, record: any) => (
                <div>{text}</div>
            )
        },
        {
            key: 'description',
            header: 'description',
        },
        {
            key: 'operation',
            title: '操作',
            render: (text: any, record: any) => {
                const operationMenu = (
                    <stub.ref.antd.Menu>
                        {
                            operationMenus.map(t =>
                                <stub.ref.antd.Menu.Item
                                    onClick={() => t.onClick(text, record)}
                                    key={t.key}
                                    icon={(t as any).icon}
                                >
                                    <span>{t.label}</span>
                                </stub.ref.antd.Menu.Item>
                            )
                        }
                    </stub.ref.antd.Menu>
                )
                return (
                    <stub.ref.antd.Dropdown overlay={operationMenu}>
                        <stub.ref.antd.Button icon={<stub.ref.icon.ai.DashOutlined/>} type={"text"} style={{borderRadius: "12px"}} size={"small"}/>
                    </stub.ref.antd.Dropdown>
                )
            },
            fixed: "right",
            width: 100
        },
    ];

    const handleSearch = (q?: any) => {
        setQuery(q)
        stub.api.post("db/instance/search", stub.ref.lodash.omit(q, "total")).then((t: any) => setData(t.data))
    }

    const [instanceAddVisible, setInstanceAddVisible] = stub.ref.react.useState<boolean>(false);

    const filter = (
        <stub.component.Filter
            filters={[
                {
                    "key": "name",
                    "label": "名称"
                },
                {
                    "key": "address",
                    "label": "地址"
                },
            ]}
            onSearch={handleSearch}
            page={data.page}
        />
    )

    const extension = (
        <stub.ref.antd.Space>
            <stub.ref.antd.Button type={"primary"} onClick={() => setInstanceAddVisible(true)}>
                添加实例
            </stub.ref.antd.Button>
        </stub.ref.antd.Space>
    )

    return (
        <div>
            <stub.component.Table title={"实例列表"}
                                  filter={filter}
                                  extension={extension}
                                  columns={columns}
                                  list={data.list}
                                  page={data.page}
            />
            <InstanceAdd visible={instanceAddVisible} onChange={() => {
                setInstanceAddVisible(false)
                handleSearch(query)
            }}/>
        </div>
    )

}

export default InstanceList