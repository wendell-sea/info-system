const db = require('../../db/index');
const path = require('path')
const getNowTime = require('../../dateFormt/index.js')
module.exports = {
    // 上传图片 地址   
    "upload": async(ctx, next) => {
        // 获取上传的图片地址
        let file = ctx.request.files.file.path
            // 获取当前 文件下 存储的地址
        let basename = path.basename(file)
            // 拼接图片连接
        let imgUrl = `${ctx.origin}/uploads/${basename}`
            // 返回当前选中的图片 链接地址 （已拼接好的地址 ！！！）
        ctx.body = imgUrl


    },
    // 添加
    "addData": async(ctx, next) => {
        let name = ctx.request.body.name
        let floor = ctx.request.body.floor
        let state = ctx.request.body.state
        let img = ctx.request.body.img
            // 插入语句
        let addsql = `INSERT INTO equipment VALUES(id, ?,?,?,?,? )`;

        let addSqlParams = [name, getNowTime(new Date()), state, floor, img];

        //需要插入的数据 
        let res = await db.query(addsql, addSqlParams)
            // 返回数据
        ctx.body = res
    },
    //查找所有列表  
    "queryAll": async(ctx, next) => {

        // 用户传递过来的参数 页码  默认为1 第一页
        let page = ctx.query.page || 1;
        // 计算当前从哪里开始查询
        let start = (page - 1) * 3;
        // sql 语句 查询所有
        let sqlTotal = `SELECT * FROM  equipment `;
        // sql 语句查询指定页码
        let sql = `SELECT * FROM  equipment limit ${start} , 3`;
        // 执行 页码查询
        let res = await db.query(sql);
        // 执行 所有查询
        let total = await db.query(sqlTotal);
        // 返回数据
        ctx.body = {
            code: 200,
            total: total.length,
            page: ctx.query.page,
            masg: '查询成功',
            data: res
        }



    },
    // 删除
    "removeEq": async(ctx, next) => {
        let id = ctx.query.id
        let sql = `DELETE FROM equipment where id= '${id}' `
        let res = db.query(sql)
        ctx.body = {
            code: 200,
            msg: '删除成功'
        }
    },
    // 搜索
    "search": async(ctx, next) => {
        let key = ctx.query.key
        let sql = `SELECT * FROM equipment WHERE name LIKE '${key}%' `;
        let res = await db.query(sql);
        console.log(res);

        ctx.body = {
            code: 200,
            data: res,
            total: res.length
        }


    },
    // 修改当前状态
    "editState": async(ctx, next) => {
        let state = ctx.request.body.state
        let id = ctx.request.body.id;
        let sql = `UPDATE equipment SET state = '${state}'  WHERE id = ${id}`;
        let res = await db.query(sql)
        ctx.body = {
            code: 200,
            msg: '修改成功'
        }
    }

}