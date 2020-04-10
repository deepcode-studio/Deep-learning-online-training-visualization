create database `coderunner`;
use `coderunner`;

create table codefile(
id bigint primary key auto_increment,
name varchar(20),
code text,
create_time time,
last_modify_time time,
-- typeid 表示目录和文件，0表示文件 1表示一级目录 2表示二级目录 
tid tinyint check(tid in (0,1,2)),
-- relationshipid 关系标识 目录内文件的rid和目录的rid相同
rid int,
-- 外键
constraint `fk` foreign key (`id`) references `users`(`id`)     
);

insert into 
	codefile(id,name,code,create_time,last_modify_time,tid,rid)
	values
    (1,'test',null,now(),now(),1,1),
    (2,'test1.py','from test2 import outprint\noutprint()',now(),now(),0,1),
    (3,'test2.py','import time\ndef outprint():\n    for i in range\(3\):\n        print("hello world!")\n        time.sleep(1)',now(),now(),0,1)
    

create table users(
id bigint primary key auto_increment,
email varchar(25),
password longblob
)