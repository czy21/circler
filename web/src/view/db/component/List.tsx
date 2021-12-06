import React, {Fragment, memo} from "react";
import stub from "@/init"
import InstanceAdd from "./InstanceAdd"
import {PageModel} from "@/model/data";


const title = "集群"

const List: React.FC<any> = (props: any) => {
    const {history, route} = props

    const [data, setData] = stub.ref.react.useState([])
    const [page, setPage] = stub.ref.react.useState<PageModel>({})


    const [filters, setFilter] = stub.ref.react.useState([
        {
            "key": "name",
            "label": "名称"
        },
    ])

    stub.ref.react.useEffect(() => {
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
            key: 'host',
            header: 'Host',
        },
        {
            key: 'port',
            header: 'Port',
        },
        {
            key: 'username',
            header: 'UserName',
        },
        {
            key: 'password',
            header: 'Password',
        },

        {
            key: 'description',
            header: 'description',
        },
        {
            key: 'operation',
            title: '操作',
            render: (text: any, record: any) => (
                <stub.ref.antd.Button icon={<stub.ref.icon.DashOutlined/>} type={"text"} style={{borderRadius: "16px"}}/>
            ),
            fixed: "right",
            width: 100
        },
    ];

    const handleSearch = (q?: any) => {
        stub.api.post("db/instance/search", stub.ref.lodash.omit(q, "total"))
            .then((t: any) => {
                setData(t.data.list)
                setPage(t.data.page)
            })
    }

    const [instanceAddVisible, setInstanceAddVisible] = stub.ref.react.useState<boolean>(false);

    return (
        <div>
            <stub.component.Table title={"实例列表"}
                                  datasource={data}
                                  columns={columns}
                                  page={page}
                                  onSearch={handleSearch}
                                  onShowCreateModal={() => setInstanceAddVisible(true)}
                                  filters={filters}
            />
            <InstanceAdd visible={instanceAddVisible} onChange={() => setInstanceAddVisible(false)}/>
        </div>
    )

}

export default List