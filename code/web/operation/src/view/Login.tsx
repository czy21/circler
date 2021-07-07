import React from "react";


export default class Login extends React.Component<any, any> {
    handleClick = () => {
        console.log('this is:', this);
    }

    render() {
        return (
            <div>
                登录
            </div>
        );
    }
}