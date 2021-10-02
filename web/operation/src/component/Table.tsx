import React from "react";
import stub from '@/init'

interface TableFormProp {
    title: string
    datasource: any[]
    pageCurrent?: number
    pageSize?: number
    total?: number
    columns: any[]
    onSearch: (query?: any) => void
    showCreateModal?: () => void
    filter?: any[]
}

const Table: React.FC<TableFormProp> = (props: TableFormProp) => {
    const {onSearch, datasource, columns, title, total, pageCurrent, pageSize, showCreateModal, filter = []} = props

    const [filterOptions, seFilterOptions] = stub.ref.react.useState(filter)
    const [currentFilter, setCurrentFilter] = stub.ref.react.useState<[string, any]>(["", undefined])
    const [tag, setTag] = stub.ref.react.useState({})


    const tagValueAny = () => {
        return (Object.values(tag) as any[]).filter((t: any) => t.value === undefined).length === 0
    }

    const editTag = (value: {}) => {
        setTag({...tag, ...value})
    }

    const renderFilter = () => {
        return (
            <stub.ref.antd.Menu
                onClick={({item, key, keyPath, domEvent}) => {
                    let tagValue: any = (tag as any)[key]?.value;
                    if (stub.ref.lodash.isEmpty(tag) || tagValueAny()) {
                        setCurrentFilter([key, tagValue])
                        editTag({
                            [key]: {
                                "label": (filterOptions.filter(t => t.key === key)[0]).label,
                                "value": tagValue
                            }
                        })
                    }
                }}>
                {filterOptions.map(t => {
                    return (<stub.ref.antd.Menu.Item key={t.key}>{t.label}</stub.ref.antd.Menu.Item>)
                })}
            </stub.ref.antd.Menu>
        )
    }

    const removeTag = (key: string) => {
        setTag(stub.ref.lodash.omit(tag, [key]))
    }

    const renderTag = () => {
        return ((Object.entries(tag) as any[]).map(([k, v]) => {
            return (<stub.ref.antd.Tag
                color={k === currentFilter[0] ? "green" : "default"}
                closable={true}
                onClick={() => setCurrentFilter([k, v.value])}
                onClose={(e) => removeTag(k)} key={k}>{[v.label, v.value].join(":")}
            </stub.ref.antd.Tag>)
        }))
    }

    const validateTag = () => {
        let validateRules = (Object.entries(tag) as any[]).filter(([k, v]) => stub.ref.lodash.isEmpty(v.value)).map(([k, v]) => v.label).join(",")
        if (validateRules) {
            stub.ref.antd.message.warn([validateRules, "不能为空"].join(" "))
        }
        return stub.ref.lodash.size(tag) == 0 || stub.ref.lodash.isEmpty(validateRules)
    }

    const getQuery = (query: any[]) => {
        return {...Object.fromEntries(Object.entries(query).map(([k, v]) => [k, v.value])), ...{pageCurrent, pageSize, total}}
    }

    return (
        <div>
            <stub.ref.antd.Row>
                <stub.ref.antd.Col span={20}>
                    <div hidden={stub.ref.lodash.size(filter) == 0}>
                        {renderTag()}
                        <stub.ref.antd.Dropdown overlay={renderFilter()} trigger={['click']}>
                            <stub.ref.antd.Input value={(currentFilter as any[])[1]}
                                                 autoComplete={"off"}
                                                 onChange={(e) => {
                                                     setCurrentFilter([(currentFilter as any[])[0], e.target.value])
                                                 }}
                                                 onPressEnter={(e: any) => {
                                                     const cK: string = (currentFilter as any[])[0]
                                                     if (cK) {
                                                         editTag({
                                                             [cK]: Object.assign((tag as any)[cK], {value: (currentFilter as any[])[1]})
                                                         })
                                                     }
                                                     if (tagValueAny()) {
                                                         setCurrentFilter(["", undefined])
                                                     }
                                                 }
                                                 }/>
                        </stub.ref.antd.Dropdown>
                    </div>
                </stub.ref.antd.Col>
                <stub.ref.antd.Col span={4}>
                    <stub.ref.antd.Space>
                        <stub.ref.antd.Button type={"default"} onClick={() => {
                            let empty: any = {}
                            setTag(empty)
                            setCurrentFilter(["", undefined])
                            onSearch(getQuery(empty))
                        }}>重置
                        </stub.ref.antd.Button>
                        <stub.ref.antd.Button type={"primary"} onClick={() => {
                            if (validateTag()) {
                                onSearch(getQuery((tag as any[])))
                            }
                        }}>查询
                        </stub.ref.antd.Button>
                        <stub.ref.antd.Button type={"primary"} onClick={showCreateModal}>
                            <stub.ref.icon.PlusOutlined/>
                            创建
                        </stub.ref.antd.Button>
                    </stub.ref.antd.Space>
                </stub.ref.antd.Col>
            </stub.ref.antd.Row>
            <stub.ref.antd.Table
                size={"small"}
                columns={columns?.map((t: any) => {
                    let p = {
                        ...t,
                        title: t.header,
                        dataIndex: t.key
                    }
                    let {header, key, ...params} = p
                    return params
                })}
                rowKey={(r: any) => r.id}
                dataSource={datasource}
                pagination={{total: total, current: pageCurrent ?? 1, pageSize: pageSize ?? 10, showTotal: ((t: any, r: any) => `第 ${r[0]}-${r[1]} 条/总共 ${t} 条`)}}/>
        </div>
    )
}

export default Table;