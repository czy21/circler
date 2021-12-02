import React, {Fragment, memo} from "react";
import stub from "@/init"
import InstanceAdd from "./InstanceAdd"
import {PageModel} from "@/model/data";


const title = "集群"

const List: React.FC<any> = (props: any) => {
    const {history, route} = props

    const [data, setData] = stub.ref.react.useState([])
    const [query, setQuery] = stub.ref.react.useState<any>({})
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
            key: 'description',
            header: '描述',
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
        setQuery(q)
        stub.api.post("database/backup/search", stub.ref.lodash.omit(q, "total"))
            .then((data: any) => {
                setData(data.data)
                setPage(data.page)
            })
    }

    const [instanceAddVisible, setInstanceAddVisible] = stub.ref.react.useState<boolean>();

    const [person, setPerson] = stub.ref.react.useState()
    const InstanceTable = () => {
        return (
            <stub.component.Table title={"实例列表"}
                                  datasource={data}
                                  columns={columns}
                                  page={page}
                                  onSearch={handleSearch}
                                  onShowCreateModal={() => setInstanceAddVisible(true)}
                                  filters={filters}
            />
        )
    }

    const A = memo(function Instance(props: any) {
        return (<InstanceAdd {...props}/>)
    })

    return (
        <div>
            {InstanceTable()}
            {<InstanceAdd visible={instanceAddVisible} onCancel={() => setInstanceAddVisible(false)}/>}
        </div>
    )

}

export default List