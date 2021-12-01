import React from "react";
import stub from "@/init";

interface TreeProps {
    value?: any[];
    onChange?: (value: any) => void;
}

const Tree: React.FC<TreeProps> = ({value, onChange}) => {

    const [options, setOptions] = stub.ref.react.useState<any>(value);

    const onLoadChange = (node:any) => {

        return []
    }

    return (
        <stub.ref.antd.Tree
            height={300}
            checkable
            fieldNames={{"title": "label", "key": "value"}}
            // onSelect={onSelect}
            // onCheck={onCheck}
            treeData={value}
        />
    );
};
export default Tree