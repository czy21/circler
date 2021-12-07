import stub from "@/init";
import React from "react";

interface TableFormProp {
    visible: boolean
    onChange: () => void
}

const InstanceAdd: React.FC<TableFormProp> = (props: TableFormProp | any) => {
    stub.ref.react.useEffect(() => setVisible(props.visible as boolean), [props.visible])
    stub.ref.react.useEffect(() => {
        stub.store.dispatch(stub.reducer.action.option.fetch(["dbInstanceKind"]))
    }, [])
    const [visible, setVisible] = stub.ref.react.useState<boolean>(false)
    const [dbOptions, setDbOptions] = stub.ref.react.useState<any>([])
    const [dbSelectOptions, setBbSelectOptions] = stub.ref.react.useState<any>([])
    const [connectState, setConnectState] = stub.ref.react.useState<boolean>()

    const [addForm] = stub.ref.antd.Form.useForm();

    const handleOk = () => {
        stub.util.basic.validateForm(addForm.validateFields(),
            (values) => {
                stub.api.post("db/instance/add", values).then(t => {
                    addForm.resetFields()
                    props.onChange()
                })
            })
    };

    const handleConnect = () => {
        stub.util.basic.validateForm(addForm.validateFields(),
            (values) => {
                stub.api.post("db/instance/ping", values)
                    .then((t: any) => setConnectState(stub.ref.lodash.isEmpty(t.error)))
            })
    }
    const onCheck = (checkedKeysValue: any) => {
        console.log('onCheck', checkedKeysValue);
    };

    return (
        <div>
            <stub.component.Create
                title={"添加实例"}
                width={600}
                visible={visible}
                onOk={handleOk}
                onCancel={() => {
                    addForm.resetFields()
                    props.onChange()
                }}>
                <stub.ref.antd.Form form={addForm}
                                    labelCol={{span: 8}}
                                    wrapperCol={{span: 10}}
                >
                    <stub.ref.antd.Form.Item label={"Name"} name={"name"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={"kind"} name={"kind"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Select options={props.globalOption.dbInstanceKind}/>
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
                            <stub.ref.antd.Button onClick={handleConnect}>Test</stub.ref.antd.Button>
                            {connectState != undefined ?
                                (connectState ? <stub.ref.icon.CheckCircleTwoTone twoToneColor={"#52c41a"}/> : <stub.ref.icon.CloseCircleTwoTone twoToneColor={"#ff4d4f"}/>) : ""}
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

export default stub.ref.reactRedux.connect(stub.util.basic.mapGlobalOptionStateToProps)(InstanceAdd)