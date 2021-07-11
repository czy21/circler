import React from 'react';
import {Modal} from 'antd';

interface CreateFormProps {
    visible: boolean;
    title: string
    width?: string | number
    onOk: () => void
    onCancel: () => void
}

const Create: React.FC<CreateFormProps> = (props) => {
    const {title, visible, onOk, onCancel, width} = props;
    return (
        <Modal
            destroyOnClose
            title={`${title}`}
            visible={visible}
            onOk={onOk}
            okText={"确认"}
            onCancel={onCancel}
            cancelText={"取消"}
            width={width ?? 800}
        >
            {props.children}
        </Modal>
    );
};

export default Create;
