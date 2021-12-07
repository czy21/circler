import styles from '@/assets/less/Home.module.less'
import stub from "@/init";
import React from "react";
import routes from "@/route";
import {renderRoutes} from "react-router-config";

const Content: React.FC<any> = (props: any) => {
    return (
        <stub.ref.antd.Layout.Content className={styles.content}>
            {renderRoutes(routes)}
        </stub.ref.antd.Layout.Content>
    )
}
export default Content