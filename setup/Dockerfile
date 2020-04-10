FROM ubuntu
MAINTAINER LIUZHIHANG

RUN echo "---- 添加阿里云镜像..."
RUN echo    "deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\n\
            deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\n\
            deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\n\
            deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\n\
            deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse\n\
            deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse\n\
            deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse\n\
            deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse\n\
            deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse\n\
            deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse" > /etc/apt/sources.list

#更新
RUN apt-get update


RUN echo "---- 开始安装环境..."

# 安装python环境
#RUN apt-get install python-dev build-essential libssl-dev libffi-dev libxml2 libxml2-dev libxslt1-dev zlib1g-dev \
#    && libc6-dev g++ dpkg-dev libffi6 libpython-dev python2.7-dev zlib1g libdpkg-perl libc6 libc-dev-bin libffi6 zlib1g\
#    && apt-get install python3 \
#    && apt-get install python3-pip \

RUN apt-get install python -y \
    && apt-get install bc -y

##安装环境
#RUN apt-get install -y gcc \
#        && apt-get install -y g++ \
#        && apt-get install -y php5-cli \
#        &&  apt-get install -y ruby \
#        &&  apt-get install -y python \
#        &&  apt-get install -y mono-xsp2 mono-xsp2-base \
#
#        &&  apt-get install -y mono-vbnc \
#        &&  apt-get install -y npm \
#        &&  apt-get install -y golang-go \
#        &&  apt-get install -y nodejs \
#        && export NODE_PATH=/usr/local/lib/node_modules/ \
#
#        &&  apt-get install -y clojure1.4 \
#
#
#        &&  apt-get install -y python-software-properties \
#        &&  apt-get install -y software-properties-common \
#
##安装java环境
#        &&  add-apt-repository -y ppa:webupd8team/java \
#        &&  apt-get update \
#        &&  echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections \
#        &&  apt-get install -y oracle-java8-installer \
#
#
#        &&  apt-get install -y gobjc \
#        &&  apt-get install -y gnustep-devel &&  sed -i 's/#define BASE_NATIVE_OBJC_EXCEPTIONS     1/#define BASE_NATIVE_OBJC_EXCEPTIONS     0/g' /usr/include/GNUstep/GNUstepBase/GSConfig.h \
#
#
#        &&  apt-get install -y scala \
#        &&  apt-get install -y mysql-server \
#        &&  apt-get install -y perl \
#
#        &&  apt-get install -y curl \
#
#        &&  apt-get install -y sudo \
#        &&  apt-get install -y bc \

# RUN echo "mysql ALL = NOPASSWD: /usr/sbin/service mysql start" | cat >> /etc/sudoers