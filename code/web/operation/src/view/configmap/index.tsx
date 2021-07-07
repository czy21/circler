import React from "react";
import {Button, Table} from "antd";
import api from "@/api"

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
];

let load = () => {
    // console.log(process.env)
    api.post("user/search", {}).then(data => {
        console.log(data)
    })
}

export default class Index extends React.Component<any, any> {


    render() {
        // return <Table dataSource={this.state.list} columns={columns}/>;
        return <Button onClick={load}>加载</Button>
    }
}