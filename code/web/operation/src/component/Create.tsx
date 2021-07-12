import React from 'react';
import {Modal} from 'antd';

interface CreateFormProps {
    visible: boolean;
    title: string
    width?: string | number
    style?: React.CSSProperties
    onOk: () => void
    onCancel: () => void
}

const Create: React.FC<CreateFormProps> = (props) => {
    const {title, visible, onOk, onCancel, width, style} = props;
    return (
        <Modal
            width={width ?? 800}
            style={style}
            destroyOnClose
            title={`${title}`}
            visible={visible}
            onOk={onOk}
            okText={"确认"}
            onCancel={onCancel}
            cancelText={"取消"}
        >
            {props.children}
        </Modal>
    );
};

export default Create;
