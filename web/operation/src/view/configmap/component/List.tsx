import React, {useEffect, useState} from "react";
import {Button, Col, Form as AntdForm, Input, InputNumber, Radio, Row, Slider} from "antd";
import api from "@/api"
import moment from "moment";
import {Detail as DetailModel, Search} from "@v/configmap/data";
import {DashOutlined} from "@ant-design/icons";
import {Table} from '@c/index'
import {objectMapper} from "@/utils";
import Create from "@c/Create";

const title = "配置"

const List: React.FC<any> = (props: any) => {
    const {history, route} = props
    const [pocket] = useState({
        volumeAccessMode: [
            {label: 'ReadWriteOnce 单个节点读写', value: 'ReadWriteOnce'},
            {label: 'ReadOnlyMany  多节点只读', value: 'ReadOnlyMany'},
            {label: 'ReadWriteMany 多节点读写', value: 'ReadWriteMany'},
        ]
    })

    const [data, setData] = useState([])
    const [page, setPage] = useState({pageCurrent: 1, pageSize: 10, total: 0})
    const [createVisible, setCreateVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [capacity, setCapacity] = useState(0)
    const [yaml, setYaml] = useState("")

    useEffect(() => {
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
            key: 'createTime',
            title: '创建时间',
        },
        {
            key: 'operation',
            title: '操作',
            render: (text: any, record: any) => (
                <Button icon={<DashOutlined/>} type={"text"} style={{borderRadius: "16px"}}/>
            ),
            fixed: "right",
            width: 100
        },
    ];

    const [createForm] = AntdForm.useForm();

    const handleSearch = (query?: Search) => {
        api.post("k8s/configmap/list", query).then((data: any) => {
            let d: any = data.items.map((t: any) => objectMapper.configmap(t))
            setData(d)
            setPage({
                pageCurrent: 1,
                pageSize: 10,
                total: d.length
            })
        })
    }
    const handleCreateShow = () => {
        createForm.resetFields()
        setCreateVisible(true)
        setCapacity(128)
    }
    const handleCreateOk = () => {
        setCreateVisible(false)
        createForm.setFieldsValue({
            capacity: capacity
        })
        api.post("k8s/volume/create", createForm.getFieldsValue()).then(() => {

        })
    };
    const handleCreateCancel = () => {
        setCreateVisible(false)
    };
    return (
        <div>
            <Table title={title}
                   onSearch={handleSearch}
                   datasource={data}
                   pageCurrent={page.pageCurrent}
                   pageSize={page.pageSize}
                   total={page.total}
                   columns={columns}
                   showCreateModal={handleCreateShow}
            />
            <Create title={`创建${title}`} visible={createVisible} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                <AntdForm form={createForm}>
                    <AntdForm.Item label={"名称"} name={"name"} required={true}>
                        <Input/>
                    </AntdForm.Item>

                </AntdForm>
            </Create>
        </div>
    )

}

export default List