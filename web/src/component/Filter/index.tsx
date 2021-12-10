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
    filters: any[]
}

interface TagValue {
    label: string,
    value?: any
}

const DefaultCurrent: any = ["", undefined]
const DefaultTag = {}

const Filter: React.FC<FilterProp> = (props: FilterProp) => {
    const [current, setCurrent] = stub.ref.react.useState<[string, any]>(DefaultCurrent)
    const [tag, setTag] = stub.ref.react.useState<any>(DefaultTag)
    const [menuVisible, setMenuVisible] = stub.ref.react.useState<boolean>()

    const putTag = (value: {}) => {
        setTag({...tag, ...value})
    }

    const removeTag = (key: string) => {
        if (current[0] === key) {
            clearCurrent()
        }
        setTag(stub.ref.lodash.omit(tag, [key]))
        inputRef.current.focus()
    }

    const renderTag = () => {
        return ((Object.entries(tag) as any[])
            .map(([k, v]) => {
                return (
                    <stub.ref.antd.Tag
                        key={k}
                        color={k === current[0] ? "#87d068" : "default"}
                        style={{borderRadius: "20px", fontSize: "14px"}}
                        closable={true}
                        onClick={() => {
                            setCurrent([k, v.value])
                            inputRef.current.focus()
                        }}
                        onClose={() => removeTag(k)}
                    >
                        {[v.label, v.value].join(":")}
                    </stub.ref.antd.Tag>
                )
            }))
    }

    const validateTag = (): boolean => {
        let validateRules: string = stub.ref.lodash.filter(tag, (v: TagValue, k) => stub.ref.lodash.isEmpty(v?.value)).map(t => t.label).join(",")
        if (validateRules) {
            stub.ref.antd.message.warn([validateRules, "不能为空"].join(" "))
        }
        return stub.ref.lodash.isEmpty(validateRules)
    }

    const transformTagToQuery = (query: any): {} => {
        return {...Object.fromEntries(Object.entries(query).map(([k, v]) => [k, (v as TagValue)?.value])), ...props.page}
    }

    const renderFilter = () => {
        return (
            <stub.ref.antd.Menu
                onClick={({item, key, keyPath, domEvent}) => {
                    let tagValue: any = tag[key]?.value;
                    setCurrent([key, tagValue])
                    putTag({
                        [key]: {
                            label: (props.filters.filter(t => t.key === key)[0]).label,
                            value: tagValue
                        } as TagValue
                    })
                    inputRef.current.focus()
                    setMenuVisible(false)
                }}>
                {props.filters.map(t => (<stub.ref.antd.Menu.Item key={t.key}>{t.label}</stub.ref.antd.Menu.Item>))}
            </stub.ref.antd.Menu>
        )
    }

    const clearCurrent = () => {
        setCurrent(DefaultCurrent)
    }
    const clearTag = () => {
        setTag(DefaultTag)
    }
    const inputRef = stub.ref.react.useRef<any>()

    return (
        <stub.ref.antd.Row gutter={8}>
            <stub.ref.antd.Col span={22}>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        {renderTag()}
                        <stub.ref.antd.Dropdown
                            overlay={renderFilter()}
                            overlayStyle={{minWidth: "180px"}}
                            trigger={['click']}
                            visible={menuVisible}
                            onVisibleChange={setMenuVisible}
                        >
                            <stub.ref.antd.Input
                                ref={inputRef}
                                type={"text"}
                                value={current[1]}
                                autoComplete={"off"}
                                onClick={() => setMenuVisible(true)}
                                onChange={(e) => {
                                    setCurrent([current[0], e.target.value])
                                    setMenuVisible(false)
                                }}
                                onPressEnter={(e: any) => {
                                    const ck: string = current[0]
                                    if (ck) {
                                        putTag({
                                            [ck]: {...tag[ck], value: current[1]} as TagValue
                                        })
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
                        clearTag()
                        clearCurrent()
                        props.onSearch(transformTagToQuery({}))
                    }}>{<stub.ref.intl.FormattedMessage id={"common.filter.reset"} defaultMessage={""}/>}
                    </stub.ref.antd.Button>
                    <stub.ref.antd.Button type={"primary"} onClick={() => {
                        if (validateTag()) {
                            clearCurrent()
                            props.onSearch(transformTagToQuery(tag))
                        }
                    }}>{<stub.ref.intl.FormattedMessage id={"common.filter.search"} defaultMessage={""}/>}
                    </stub.ref.antd.Button>
                </stub.ref.antd.Space>
            </stub.ref.antd.Col>
        </stub.ref.antd.Row>
    )
}

export default Filter