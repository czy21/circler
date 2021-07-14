#!/bin/bash

dir=$(cd "$(dirname "$0")"; pwd)
temp=${dir}/___temp
rm -rf ${temp} && mkdir -p ${temp}

temp_api=${temp}/api
api_main=${temp_api}/main.go

code_api_path=code/api/
#export GOPATH=${dir}/${code_api_path}

echo ${api_main}
cd code/api/src && go build -o ${api_main} && cd ${dir}