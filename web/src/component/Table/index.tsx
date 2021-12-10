import React from "react";
import stub from '@/init'
import {PageModel} from "@/model/data";

interface TableProp {
    list: any[]
    page?: {
        pageIndex?: number,
        pageSize?: number,
        total?: number
    }
    columns: any[]
    filter?: any
    extension?: any
}

const Index: React.FC<TableProp> = (props: TableProp) => {

    const [page, setPage] = stub.ref.react.useState<PageModel>({pageIndex: 1, pageSize: 10, ...props.page})

    return (
        <div>
            <stub.ref.antd.Space direction={"vertical"} style={{width: "100%"}} size={"middle"}>
                {props.filter}
                {props.extension}
                <stub.ref.antd.Table
                    size={"small"}
                    columns={props.columns?.map((t: any) => stub.ref.lodash.omit({...t, title: t.header, dataIndex: t.key}, ["key", "header"]))}
                    rowKey={(r: any) => r.id}
                    dataSource={props.list}
                    pagination={page && {
                        total: page?.total,
                        current: page?.pageIndex,
                        pageSize: page?.pageSize,
                        showTotal: ((t: any, r: any) => `第 ${r[0]}-${r[1]} 条/总共 ${t} 条`),
                        onChange: (pageIndex, pageSize) => setPage({pageIndex, pageSize})
                    }}
                />
            </stub.ref.antd.Space>
        </div>
    )
}

export default Index;