import React from "react";
import {Button, Col, Form as AntdForm, Input, Row, Space, Table as AntdTable, Select} from "antd";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";

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
    const [searchForm] = AntdForm.useForm();

    return (
        <div>
            <AntdForm layout={"inline"}
                      style={{marginBottom: 20}}
                      form={searchForm}
            >
                <Row style={{width: "100%"}}>
                    <Col span={20}>
                        <AntdForm.Item name="search">
                            <Input prefix={<SearchOutlined/>} onPressEnter={() => onSearch(searchForm.getFieldsValue())}/>
                        </AntdForm.Item>
                    </Col>
                    <Col span={4}>
                        <Space>
                            <Button type={"default"} onClick={() => {
                                searchForm.resetFields()
                                onSearch()
                            }}>重置</Button>
                            <Button type={"primary"} onClick={() => onSearch(searchForm.getFieldsValue())}>查询</Button>
                            <Button type={"primary"} onClick={showCreateModal}><PlusOutlined/>创建</Button>
                        </Space>

                    </Col>
                </Row>
            </AntdForm>
            <AntdTable
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