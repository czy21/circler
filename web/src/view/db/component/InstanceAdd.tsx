import stub from "@/init";
import React from "react";

import {Modal} from '@c'

interface TableFormProp {
    visible: boolean
    onChange: () => void
}

const InstanceAdd: React.FC<TableFormProp> = (props: TableFormProp | any) => {
    const [visible, setVisible] = React.useState<boolean>(false)
    const [connectState, setConnectState] = React.useState<boolean>()
    React.useEffect(() => setVisible(props.visible as boolean), [props.visible])

    const [addForm] = stub.ref.antd.Form.useForm();

    const handleOk = () => {
        stub.util.basic.validateForm(addForm.validateFields(),
            (values) => {
                stub.api.post("db/instance/add", values).then(t => {
                    addForm.resetFields()
                    setConnectState(undefined)
                    props.onChange()
                })
            })
    };

    const handleCancel = () => {
        addForm.resetFields()
        setConnectState(undefined)
        props.onChange()
    }

    const handleConnect = () => {
        stub.util.basic.validateForm(addForm.validateFields(),
            (values) => {
                stub.api.post("db/instance/ping", values)
                    .then((t: any) => setConnectState(stub.ref.lodash.isEmpty(t.error)))
            })
    }

    return (
        <div>
            <Modal
                title={"添加实例"}
                width={600}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <stub.ref.antd.Form form={addForm}
                                    labelCol={{span: 8}}
                                    wrapperCol={{span: 10}}
                >
                    <stub.ref.antd.Form.Item label={<stub.ref.intl.FormattedMessage id={"db.instance.add.name"} defaultMessage={""}/>} name={"name"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={<stub.ref.intl.FormattedMessage id={"db.instance.add.kind"} defaultMessage={""}/>} name={"kind"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Select options={props.globalOption.dbInstanceKind}/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={<stub.ref.intl.FormattedMessage id={"db.instance.add.host"} defaultMessage={""}/>} name={"host"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={<stub.ref.intl.FormattedMessage id={"db.instance.add.port"} defaultMessage={""}/>} name={"port"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={<stub.ref.intl.FormattedMessage id={"db.instance.add.username"} defaultMessage={""}/>} name={"username"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={<stub.ref.intl.FormattedMessage id={"db.instance.add.password"} defaultMessage={""}/>} name={"password"}
                                             rules={[{required: true}]}
                    >
                        <stub.ref.antd.Input.Password/>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item {...{wrapperCol: {offset: 8}}}>
                        <stub.ref.antd.Space>
                            <stub.ref.antd.Button onClick={handleConnect} size={"small"}>Test</stub.ref.antd.Button>
                            {connectState !== undefined ?
                                (connectState ? <stub.ref.icon.ai.CheckCircleTwoTone twoToneColor={"#52c41a"}/> : <stub.ref.icon.ai.CloseCircleTwoTone twoToneColor={"#ff4d4f"}/>) : ""}
                        </stub.ref.antd.Space>
                    </stub.ref.antd.Form.Item>
                    <stub.ref.antd.Form.Item label={<stub.ref.intl.FormattedMessage id={"db.instance.add.description"} defaultMessage={""}/>} name={"description"}>
                        <stub.ref.antd.Input.TextArea/>
                    </stub.ref.antd.Form.Item>
                </stub.ref.antd.Form>
            </Modal>
        </div>
    )
}

export default stub.ref.reactRedux.connect(stub.util.basic.mapGlobalOptionStateToProps)(InstanceAdd)