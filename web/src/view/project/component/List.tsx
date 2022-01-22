import stub from "@/init"
import React from "react";
import {OperationRender} from "@c/Table";

const List: React.FC<any> = (props: any) => {

    const [data, setData] = stub.ref.react.useState<any>({})
    const [query, setQuery] = stub.ref.react.useState<any>()

    stub.ref.react.useEffect(() => {
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
            render: (text: any, record: any) => OperationRender(text, record, operationActions)
        }
    ];

    const handleSearch = (q?: any) => {
        setQuery(q)
        stub.api.post("project/search", stub.ref.lodash.omit(q, "total")).then((t: any) => setData(t.data))
    }

    const [instanceAddGroupVisible, setInstanceAddGroupVisible] = stub.ref.react.useState<boolean>(false);
    const [instanceAddProjectVisible, setInstanceAddProjectVisible] = stub.ref.react.useState<boolean>(false);

    const filter = (
        <stub.component.Filter
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
            <stub.component.Table filter={filter}
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