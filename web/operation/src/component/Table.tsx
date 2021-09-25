import React from "react";
import stub from '@/init'

interface TableFormProp {
    title: string
    datasource: any[]
    pageCurrent?: number
    pageSize?: number
    total?: number
    columns: any[]
    onSearch: (query?: any) => void;
    showCreateModal?: () => void
}

const Table: React.FC<TableFormProp> = (props: TableFormProp) => {
    const {onSearch, datasource, columns, title, total, pageCurrent, pageSize, showCreateModal} = props
    const [searchForm] = stub.ref.antd.Form.useForm();

    return (
        <div>
            <stub.ref.antd.Form layout={"inline"}
                            style={{marginBottom: 20}}
                            form={searchForm}
            >
                <stub.ref.antd.Row style={{width: "100%"}}>
                    <stub.ref.antd.Col span={20}>
                        <stub.ref.antd.Form.Item name="search">
                            <stub.ref.antd.Input prefix={<stub.ref.icon.SearchOutlined/>} onPressEnter={() => onSearch(searchForm.getFieldsValue())}/>
                        </stub.ref.antd.Form.Item>
                    </stub.ref.antd.Col>
                    <stub.ref.antd.Col span={4}>
                        <stub.ref.antd.Space>
                            <stub.ref.antd.Button type={"default"} onClick={() => {
                                searchForm.resetFields()
                                onSearch()
                            }}>重置
                            </stub.ref.antd.Button>
                            <stub.ref.antd.Button type={"primary"} onClick={() => onSearch(searchForm.getFieldsValue())}>查询</stub.ref.antd.Button>
                            <stub.ref.antd.Button type={"primary"} onClick={showCreateModal}><stub.ref.icon.PlusOutlined/>创建</stub.ref.antd.Button>
                        </stub.ref.antd.Space>

                    </stub.ref.antd.Col>
                </stub.ref.antd.Row>
            </stub.ref.antd.Form>
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