#!/bin/bash

echo "检查Docker......"
docker -v
if [[ $? -eq  0 ]]; then
    echo "检查到Docker已安装!"
else
    echo "安装docker环境..."
    curl -SSL https://get.daocloud.io/docker | sh
    echo "安装docker环境...安装完成!"
fi

#############################
## NodeJS 6 Setup
#############################
curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum -y install nodejs gcc-c++ make
echo "NodeJS Setup Complete"
#############################
## Start Docker
#############################
chmod 777 ../common/DockerTimeout.sh
chmod 777 ../Payload/script.sh
chmod 777 UpdateDocker.sh

service docker restart
./UpdateDocker.sh
