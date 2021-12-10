import React from 'react';
import stub from '@/init';
import {ModalProps} from "antd"

const Modal: React.FC<ModalProps> = (props: ModalProps|any) => {
    return (
        <stub.ref.antd.Modal
            width={props.width ?? 800}
            style={props.style}
            destroyOnClose
            title={props.title}
            visible={props.visible}
            onOk={props.onOk}
            okText={<stub.ref.intl.FormattedMessage id={"common.ok"} defaultMessage={""}/>}
            onCancel={props.onCancel}
            cancelText={<stub.ref.intl.FormattedMessage id={"common.cancel"} defaultMessage={""}/>}
            {...props}
        >
            {props.children}
        </stub.ref.antd.Modal>
    );
};

export default Modal;
