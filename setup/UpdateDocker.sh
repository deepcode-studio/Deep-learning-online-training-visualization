#!/usr/bin/env bash

echo "---- 创建虚拟沙箱环境"
docker build -t 'virtual_sandbox' .
echo "---- 虚拟沙箱创建成功"
docker images
