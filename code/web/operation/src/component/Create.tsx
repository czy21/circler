import React from 'react';
import {Modal} from 'antd';

interface CreateFormProps {
    visible: boolean;
    title: string
    onOk: () => void
    onCancel: () => void
}

const Create: React.FC<CreateFormProps> = (props) => {
    const {title, visible, onOk, onCancel} = props;
    return (
        <Modal
            destroyOnClose
            title={`创建${title}`}
            visible={visible}
            onCancel={onOk}
            onOk={onCancel}
            okText={"确认"}
            cancelText={"取消"}
        >
            {props.children}
        </Modal>
    );
};

export default Create;
