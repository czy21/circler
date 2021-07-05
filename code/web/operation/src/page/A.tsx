import React from "react";
import {Button} from "antd";

function transformToFields() {
    {
        var RECORDS = [
            {
                "property_key": "id"
            },
            {
                "property_key": "periodId"
            },
            {
                "property_key": "institutionCode"
            },
            {
                "property_key": "institutionName"
            },
            {
                "property_key": "institutionProvinceId"
            },
            {
                "property_key": "institutionCityId"
            },
            {
                "property_key": "institutionAddress"
            },
            {
                "property_key": "institutionCategory"
            },
            {
                "property_key": "appealReason"
            },
            {
                "property_key": "appealStatus"
            },
            {
                "property_key": "createdTime"
            },
            {
                "property_key": "creator"
            },
            {
                "property_key": "modifiedTime"
            },
            {
                "property_key": "modifier"
            },
            {
                "property_key": "deleted"
            }
        ]

        console.log(JSON.stringify(RECORDS.map(s => FieldObj(s.property_key))));
    }
}

function FieldObj(key: string) {

    return {
        "key": `${key}`,
        "order": 0,
        "providers": [
            {
                "ref": "sampleProvider",
                "args": {
                    "adds": [
                        {
                            "column": [
                                {
                                    "text": `${key},`
                                }
                            ],
                            "value": [
                                {
                                    "text": `#{${key}},`
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    }
}


export default class A extends React.Component<any, any> {

    render() {
        return <div><Button onClick={transformToFields}>确认</Button></div>;
    }
}