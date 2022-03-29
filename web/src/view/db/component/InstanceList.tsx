import stub from "@/init"
import React from "react";
import react from 'react'
import InstanceAdd from "./InstanceAdd"
import {Table, Filter, OperationRender} from "@c";

const InstanceList: React.FC<any> = (props: any) => {

    const [data, setData] = React.useState<any>({})
    const [query, setQuery] = React.useState<any>()

    react.useEffect(() => {
        stub.store.dispatch(stub.reducer.action.option.fetch(["dbInstanceKind", "genderKind"]))
        handleSearch()
    }, [])
    const operationActions = [
        {
            key: "backup",
            label: <stub.ref.intl.FormattedMessage id={"db.instance.list.backup"} defaultMessage={""}/>,
            onClick: (text: any, record: any) => {
                console.log(record)
            }
        }
    ]
    const columns = [
        {
            key: 'name',
            header: <stub.ref.intl.FormattedMessage id={"db.instance.list.name"} defaultMessage={""}/>,
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
            header: <stub.ref.intl.FormattedMessage id={"db.instance.list.host"} defaultMessage={""}/>,
        },
        {
            key: 'port',
            header: <stub.ref.intl.FormattedMessage id={"db.instance.list.port"} defaultMessage={""}/>,
        },
        {
            key: 'username',
            header: <stub.ref.intl.FormattedMessage id={"db.instance.list.username"} defaultMessage={""}/>,
        },
        {
            key: 'password',
            header: <stub.ref.intl.FormattedMessage id={"db.instance.list.password"} defaultMessage={""}/>,
            render: (text: any, record: any) => (
                <div>{text}</div>
            )
        },
        {
            key: 'description',
            header: <stub.ref.intl.FormattedMessage id={"db.instance.list.description"} defaultMessage={""}/>,
        },
        {
            key: 'operation',
            header: <stub.ref.intl.FormattedMessage id={"table.operation"} defaultMessage={""}/>,
            render: (text: any, record: any) => OperationRender(text, record, operationActions)
        }
    ];

    const handleSearch = (q?: any) => {
        setQuery(q)
        stub.api.post("db/instance/search", stub.ref.lodash.omit(q, "total")).then((t: any) => setData(t.data))
    }

    const [instanceAddVisible, setInstanceAddVisible] = React.useState<boolean>(false);

    const filter = (
        <Filter
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
                {<stub.ref.intl.FormattedMessage id={"db.instance.add.btn"} defaultMessage={""}/>}
            </stub.ref.antd.Button>
        </stub.ref.antd.Space>
    )

    return (
        <div>
            <Table filter={filter}
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