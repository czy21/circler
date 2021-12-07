import React from "react";
import stub from "@/init";
import styles from "./index.m.less";

interface FilterProp {
    onSearch: (query?: any) => void
    page?: {
        pageIndex?: number,
        pageSize?: number,
        total?: number
    }
    filters?: any[]
}

const Filter:React.FC<FilterProp>=(props:FilterProp)=>{
    const [currentFilter, setCurrentFilter] = stub.ref.react.useState<[string, any]>(["", undefined])
    const [tag, setTag] = stub.ref.react.useState({})

    const tagValueAny = () => {
        return stub.ref.lodash.isEmpty(Object.values(tag))
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
                color={stub.ref.lodash.isEqual(k,currentFilter[0])  ? "#87d068" : undefined}
                style={{borderRadius: "20px", fontSize: "14px"}}
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
        return stub.ref.lodash.isEmpty(tag) || stub.ref.lodash.isEmpty(validateRules)
    }

    const getQuery = (query: any[]) => {
        return {...Object.fromEntries(Object.entries(query).map(([k, v]) => [k, v.value])), ...props.page}
    }

    const renderFilter = () => {
        return (
            <stub.ref.antd.Menu
                onClick={({item, key, keyPath, domEvent}) => {
                    console.log(tag)
                    let tagValue: any = (tag as any)[key]?.value;
                    if (stub.ref.lodash.isEmpty(tag) || tagValueAny()) {
                        setCurrentFilter([key, tagValue])
                        editTag({
                            [key]: {
                                "label": ((props.filters as any[]).filter(t => t.key === key)[0]).label,
                                "value": tagValue
                            }
                        })
                    }
                }}>
                {(props.filters as any[]).map(t => {
                    return (<stub.ref.antd.Menu.Item key={t.key}>{t.label}</stub.ref.antd.Menu.Item>)
                })}
            </stub.ref.antd.Menu>
        )
    }
    const filterRef = stub.ref.react.useRef<any>();
    return (
        <stub.ref.antd.Row gutter={8}>
            <stub.ref.antd.Col span={22}>
                <div hidden={stub.ref.lodash.isEmpty(props.filters)}
                     className={styles.wrapper}
                     ref={filterRef}
                >
                    <div className={styles.content}>
                        {renderTag()}
                        <stub.ref.antd.Dropdown overlay={renderFilter()} trigger={['click']} overlayStyle={{minWidth: "180px"}}>
                            <stub.ref.antd.Input
                                type={"text"}
                                value={(currentFilter as any[])[1]}
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
                                }}
                            />
                        </stub.ref.antd.Dropdown>
                    </div>
                </div>
            </stub.ref.antd.Col>
            <stub.ref.antd.Col span={2}>
                <stub.ref.antd.Space>
                    <stub.ref.antd.Button type={"default"} onClick={() => {
                        let empty: any = {}
                        setTag(empty)
                        setCurrentFilter(["", undefined])
                        props.onSearch(getQuery(empty))
                    }}>重置
                    </stub.ref.antd.Button>
                    <stub.ref.antd.Button type={"primary"} onClick={() => {
                        if (validateTag()) {
                            props.onSearch(getQuery((tag as any[])))
                        }
                    }}>查询
                    </stub.ref.antd.Button>
                </stub.ref.antd.Space>
            </stub.ref.antd.Col>
        </stub.ref.antd.Row>
    )
}

export default Filter