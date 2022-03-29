import stub from "@/init"
import React from "react";
import {Table, Filter} from "@c";

const List: React.FC<any> = (props: any) => {

    const [data, setData] = React.useState<any>({})
    const [query, setQuery] = React.useState<any>()

    React.useEffect(() => {
        // stub.store.dispatch(stub.reducer.action.option.fetch(["dbInstanceKind", "genderKind"]))
        handleSearch()
    }, [])
    const operationActions = [
        {
            key: "build",
            label: <stub.ref.intl.FormattedMessage id={"project.list.operation.build"} defaultMessage={""}/>,
            onClick: (text: any, record: any) => {
                console.log(record)
            }
        },
        {
            key: "deploy",
            label: <stub.ref.intl.FormattedMessage id={"project.list.operation.deploy"} defaultMessage={""}/>,
            onClick: (text: any, record: any) => {
                console.log(record)
            }
        }
    ]
    const columns = [
        {
            key: 'name',
            header: <stub.ref.intl.FormattedMessage id={"project.list.name"} defaultMessage={""}/>,
            render: (text: any, record: any) => {
                return (
                    <a onClick={() => {
                        props.history.push(`${props.route.path}/${record.name}`)
                    }}>{record.name}</a>
                )
            }
        },
        {
            key: 'description',
            header: <stub.ref.intl.FormattedMessage id={"project.list.description"} defaultMessage={""}/>,
        },
        {
            key: 'group',
            header: <stub.ref.intl.FormattedMessage id={"project.list.group"} defaultMessage={""}/>,
        },
        {
            key: 'operation',
            header: <stub.ref.intl.FormattedMessage id={"table.operation"} defaultMessage={""}/>,
            render: (text: any, record: any) => (<div></div>)
        }
    ];

    const handleSearch = (q?: any) => {
        setQuery(q)
        stub.api.post("project/search", stub.ref.lodash.omit(q, "total")).then((t: any) => setData(t.data))
    }

    const [instanceAddGroupVisible, setInstanceAddGroupVisible] = React.useState<boolean>(false);
    const [instanceAddProjectVisible, setInstanceAddProjectVisible] = React.useState<boolean>(false);

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
            <stub.ref.antd.Button type={"primary"} onClick={() => setInstanceAddProjectVisible(true)}>
                {<stub.ref.intl.FormattedMessage id={"project.list.addProject"} defaultMessage={""}/>}
            </stub.ref.antd.Button>
            <stub.ref.antd.Button type={"primary"} onClick={() => setInstanceAddGroupVisible(true)}>
                {<stub.ref.intl.FormattedMessage id={"project.list.addGroup"} defaultMessage={""}/>}
            </stub.ref.antd.Button>
        </stub.ref.antd.Space>
    )

    return (
        <div>
            <Table filter={filter}
                   key={"projectList"}
                   extension={extension}
                   columns={columns}
                   list={data.list}
                   page={data.page}
            />
        </div>
    )

}

export default List