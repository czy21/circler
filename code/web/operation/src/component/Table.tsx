import React, {useState} from "react";
import {Button, Col, Form as AntdForm, Input, Row, Space, Table as AntdTable} from "antd";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";

const Table: React.FC<any> = (props: any) => {
    const {onSearch, datasource, columns} = props
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
                            <Input prefix={<SearchOutlined/>}/>
                        </AntdForm.Item>
                    </Col>
                    <Col span={4}>
                        <Space>
                            <Button type={"default"} onClick={() => {
                                searchForm.resetFields()
                                onSearch()
                            }}>重置</Button>
                            <Button type={"primary"} onClick={() => onSearch(searchForm.getFieldsValue())}>查询</Button>
                            <Button type={"primary"}><PlusOutlined/>创建</Button>
                        </Space>

                    </Col>
                </Row>
            </AntdForm>
            <AntdTable columns={columns?.map((t: any) => {
                let p = {
                    ...t,
                    dataIndex: t.key,
                }
                if (t.key !== "operation") {
                    p.width = t.width ?? 150
                }
                return p
            })} rowKey={r => r.id} dataSource={datasource} pagination={{total: datasource?.length, pageSize: 10, showTotal: ((t: any, r: any) => `第 ${r[0]}-${r[1]} 条/总共 ${t} 条`)}}/>
        </div>
    )
}

export default Table;