import React from "react";
import stub from '@/init'
import {MenuClickEventHandler, MenuInfo} from "rc-menu/lib/interface";

interface TableFormProp {
    title: string
    datasource: any[]
    pageCurrent?: number
    pageSize?: number
    total?: number
    columns: any[]
    onSearch: (query?: any) => void
    showCreateModal?: () => void
    filter: any[]
}

const Table: React.FC<TableFormProp> = (props: TableFormProp) => {
    const {onSearch, datasource, columns, title, total, pageCurrent, pageSize, showCreateModal, filter} = props
    const [searchForm] = stub.ref.antd.Form.useForm();

    const [filterOptions, setFilterMenu] = stub.ref.react.useState(filter)
    const [tag, setTag] = stub.ref.react.useState({})
    const [currentFilterOption, setCurrentFilter] = stub.ref.react.useState<[string, any]>(["", undefined])
    const renderSearchMenu = () => {
        return (
            <stub.ref.antd.Menu onClick={(e: MenuInfo) => {
                let k: string = e.key
                setCurrentFilter([k, undefined])
                let tagValue: any = (tag as any)[k]?.value;
                setCurrentFilter([k, tagValue])
                setTag({
                    ...tag,
                    ...{
                        [k]: {
                            "label": (filterOptions.filter(t => t.key === k)[0]).label,
                            "value": tagValue
                        }
                    }
                })
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

    const renderTags = () => {
        return ((Object.entries(tag) as any[]).map(([k, v]) => {
            return (<stub.ref.antd.Tag closable={true} onClose={(e) => removeTag(k)} key={k}>{[v.label, v.value].join(":")}</stub.ref.antd.Tag>)
        }))
    }

    const validateTags = () => {
        let validateRules = (Object.entries(tag) as any[]).filter(([k, v]) => stub.ref.lodash.isEmpty(v.value)).map(([k, v]) => v.label).join(",")
        if (validateRules) {
            stub.ref.antd.message.warn([validateRules, "不能为空"].join(" "))
        }
    }

    return (
        <div>
            <stub.ref.antd.Row>
                <stub.ref.antd.Col span={20}>
                    {renderTags()}
                    <stub.ref.antd.Dropdown overlay={renderSearchMenu()} trigger={['click']}>
                        <stub.ref.antd.Input value={(currentFilterOption as any[])[1]}
                                             autoComplete={"off"}
                                             onChange={(e) => {
                                                 setCurrentFilter([(currentFilterOption as any[])[0], e.target.value])
                                             }}
                                             onPressEnter={(e: any) => {
                                                 let tagValue = (tag as any)[(currentFilterOption as any[])[0]]
                                                 tagValue.value = (currentFilterOption as any[])[1]
                                                 setTag({
                                                     ...tag,
                                                     ...{[(currentFilterOption as any[])[0]]: tagValue}
                                                 })
                                                 setCurrentFilter(["", undefined])
                                             }}/>
                    </stub.ref.antd.Dropdown>
                </stub.ref.antd.Col>
                <stub.ref.antd.Col span={4}>
                    <stub.ref.antd.Space>
                        <stub.ref.antd.Button type={"default"} onClick={() => {
                            onSearch()
                        }}>重置
                        </stub.ref.antd.Button>
                        <stub.ref.antd.Button type={"primary"} onClick={() => {
                            validateTags()
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
                })} rowKey={(r: any) => r.id}
                dataSource={datasource}
                pagination={{total: total, current: pageCurrent ?? 1, pageSize: pageSize ?? 10, showTotal: ((t: any, r: any) => `第 ${r[0]}-${r[1]} 条/总共 ${t} 条`)}}/>
        </div>
    )
}

export default Table;