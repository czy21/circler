import React from "react";
import stub from '@/init'
import {PageModel} from "@/model/data";

interface TableFormProp {
    title: string
    onSearch: (query?: any) => void
    datasource: any[]
    page?: {
        pageIndex?: number,
        pageSize?: number,
        total?: number
    }
    columns: any[]
    filters?: any[]
    actions?: any[]
}

const Table: React.FC<TableFormProp> = (props: TableFormProp) => {
    const {datasource, columns, title, page, onSearch, filters = [], actions = []} = props

    const [filterOptions, seFilterOptions] = stub.ref.react.useState(filters)
    const [currentFilter, setCurrentFilter] = stub.ref.react.useState<[string, any]>(["", undefined])
    const [tag, setTag] = stub.ref.react.useState({})
    const [pageState, setPageState] = stub.ref.react.useState<PageModel>({pageIndex: 1, pageSize: 10, ...page})


    const tagValueAny = () => {
        return (Object.values(tag) as any[]).filter((t: any) => t.value === undefined).length === 0
    }

    const editTag = (value: {}) => {
        setTag({...tag, ...value})
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
                onClose={(e) => removeTag(k)} key={k}>{[v.label, v.value].join(": ")}
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
        return {...Object.fromEntries(Object.entries(query).map(([k, v]) => [k, v.value])), ...pageState}
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

    return (
        <div>
            <stub.ref.antd.Space direction={"vertical"} style={{width: "100%"}} size={"middle"}>
                <stub.ref.antd.Row gutter={8}>
                    <stub.ref.antd.Col span={22}>
                        <div hidden={stub.ref.lodash.size(filters) == 0}>
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
                    <stub.ref.antd.Col span={2}>
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
                        </stub.ref.antd.Space>
                    </stub.ref.antd.Col>
                </stub.ref.antd.Row>
                {props.actions}
                <stub.ref.antd.Table
                    style={{width: "100%"}}
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
                    pagination={page && {
                        total: pageState?.total,
                        current: pageState?.pageIndex,
                        pageSize: pageState?.pageSize,
                        showTotal: ((t: any, r: any) => `第 ${r[0]}-${r[1]} 条/总共 ${t} 条`),
                        onChange: (pageIndex, pageSize) => setPageState({pageIndex, pageSize})
                    }}
                />
            </stub.ref.antd.Space>
        </div>
    )
}

export default Table;