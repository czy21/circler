#!/bin/bash

dir=$(cd "$(dirname "$0")"; pwd)
temp=${dir}/___temp
rm -rf ${temp} && mkdir -p ${temp}

api_path=${dir}/api/src
api_main=${temp}/main.go

cd ${api_path} && go build -o ${api_main} && cd ${dir}