import stub from "@/init";
import React from "react";


interface TableFormProp {
    visible?: boolean
    onCancel: () => void
}

const InstanceAdd: React.FC<TableFormProp> = (props: TableFormProp) => {
    stub.ref.react.useEffect(() => setBackupVisible(props.visible as boolean), [props.visible])
    const [option] = stub.ref.react.useState({
        "db": [
            {
                "label": "mysql",
                "value": "mysql"
            },
            {
                "label": "postgresql",
                "value": "postgresql"
            }
        ]
    })

    const [createVisible, setBackupVisible] = stub.ref.react.useState<boolean>(false)
    const [dbOptions, setDbOptions] = stub.ref.react.useState<any>([])
    const [dbSelectOptions, setBbSelectOptions] = stub.ref.react.useState<any>([])
    const [connectState, setConnectState] = stub.ref.react.useState<boolean>()

    const [queryInstanceForm] = stub.ref.antd.Form.useForm();

    const handleAddInstanceOk = async () => {
        try {
            const input = await queryInstanceForm.validateFields();
            stub.api.post("db/instance/add", input).then((t: any) => {
                setBackupVisible(false)
            })
        } catch (errorInfo) {

        }
    };

    const handleTestConnect = async () => {
        try {
            const input = await queryInstanceForm.validateFields();
            stub.api.post("db/listMeta", input).then((t: any) => {
                setConnectState(true)
            })
        } catch (errorInfo) {

        }
    }
    const onCheck = (checkedKeysValue: any) => {
        console.log('onCheck', checkedKeysValue);
    };

    return (
        <div>
            <stub.component.Create
                title={"添加实例"}
                width={600}
                visible={createVisible}
                onOk={handleAddInstanceOk}
                onCancel={() => props.onCancel()}>
                <stub.ref.antd.Form form={queryInstanceForm}
                                    labelCol={{span: 8}}
                                    wrapperCol={{span: 10}}
                                    initialValues={{
                                        "host": "192.168.2.18",
                                        "port": "3306",
                                        "username": "root",
                                        "password": "Czy.190815"
                                    }}
                >
                    <stub.ref.antd.Form.Item label={"kind"} name={"kind"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Select options={option["db"]}/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"Host"} name={"host"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"Port"} name={"port"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"UserName"} name={"username"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"Password"} name={"password"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input.Password/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item {...{wrapperCol: {offset: 8}}}>
                        <stub.ref.antd.Space>
                            <stub.ref.antd.Button onClick={handleTestConnect}>Test</stub.ref.antd.Button>
                            {connectState && <stub.ref.icon.CheckCircleTwoTone twoToneColor={"#52c41a"}/>}
                        </stub.ref.antd.Space>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item>
                        <stub.ref.antd.Tree
                            height={300}
                            checkable
                            fieldNames={{"title": "label", "key": "value"}}
                            onCheck={onCheck}
                            // onSelect={onSelect}
                            // onCheck={onCheck}
                            treeData={dbOptions}
                        />
                    </stub.ref.antd.Form.Item>
                </stub.ref.antd.Form>
            </stub.component.Create>
        </div>
    )
}

export default InstanceAdd