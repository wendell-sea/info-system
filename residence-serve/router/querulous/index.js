const db = require('../../db/index');
const getNowTime = require('../../dateFormt/index.js')
module.exports = {
    // 获取未处理数据
    "queryAllQu": async(ctx, next) => {
        // 用户传递过来的参数 页码  默认为1 第一页
        let page = ctx.query.page || 1;
        // 计算当前从哪里开始查询
        let start = (page - 1) * 5;
        // sql 语句 查询所有
        let sqlTotal = `SELECT * FROM  querulous `;
        // sql 语句查询指定页码
        let sql = `SELECT * FROM  querulous limit ${start} , 5`;
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
    // 修改处理当前状态
    "disposeInfo": async(ctx, next) => {
        let id = ctx.request.body.id
            //1: 根据id 查询当前 信息
        let sqlQuery = `SELECT * FROM querulous where id= "${id}"`;
        let res = await db.query(sqlQuery)
            // 2: 把查询出来的 数据  添加进已处理的列表当中
        let name = res[0].name
        let floor = res[0].floor
        let info = res[0].info
        let result = '0'
            // 3:插入语句
        let addsqlRes = `INSERT INTO dispose VALUES(id,?,?,?,?,? )`;
        let addSqlParamsRes = [name, getNowTime(new Date()), floor, info, result];
        let res1 = await db.query(addsqlRes, addSqlParamsRes);
        // 4；最后根据id 删除 当前没有处理表中的 信息
        let sqlRemove = `DELETE FROM querulous where id= '${id}' `
        let res2 = db.query(sqlRemove)
        ctx.body = {
            code: 200,
            msg: '处理成功'
        }
    },
    // 获取 已处理数据
    "untreated": async(ctx, next) => {
        // 用户传递过来的参数 页码  默认为1 第一页
        let page = ctx.query.page || 1;
        // 计算当前从哪里开始查询
        let start = (page - 1) * 5;
        // sql 语句 查询所有
        let sqlTotal = `SELECT * FROM  dispose `;
        // sql 语句查询指定页码
        let sql = `SELECT * FROM  dispose limit ${start} , 5`;
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

}