
此项目用到的技术栈:

后端: node koa mysql  等(后端接口 写的简单 基本上就是一些增删查改 )

前端:Vue Vue-Router axios element-ui 等

简介:

一个简单的小区管理后台 用户权限 一级权限 二级权限

一级权限: 对系统的增删改查 (一般这权限就是小区管理者)

二级权限: 只能对系统简单的查看,搜索功能 (这一般就是那种停车场管理人啊,保安室的可以查看对应是不是本小区的 或者找人什么的 )

这个项目是按照自己小区层面上来整的,肯定不止这么点儿模块，后面可以慢慢扩展

项目包含模块: 

用户管理 
住户信息管理
物业设备管理
住户投诉管理
车位管理
小区维修管理

声明: 

 项目里面重复相同的功能,和接口后面有一些就没做了
 
项目启动:

（ 安装mysql，导入sql文件入数据库，db文件下更改自己mysql账号密码 )

 npm install

 后端启动 :  npm run dev

 前端启动 :  npm run serve
