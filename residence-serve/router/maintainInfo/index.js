const db = require('../../db/index');
const getNowTime = require('../../dateFormt/index.js')
module.exports = {
    // 查询所有
    "queryMaInfo": async(ctx, next) => {
        // 用户传递过来的参数 页码  默认为1 第一页
        let page = ctx.query.page || 1;
        // 计算当前从哪里开始查询
        let start = (page - 1) * 3;
        // sql 语句 查询所有
        let sqlTotal = `SELECT * FROM  maintainInfo `;
        // sql 语句查询指定页码
        let sql = `SELECT * FROM  maintainInfo limit ${start} , 3`;
        // 执行 页码查询
        let res = await db.query(sql);
        // 执行 所有查询
        let total = await db.query(sqlTotal);
        // 返回数据
        ctx.body = {
            code: 200,
            tatol: total.length,
            page: ctx.query.page,
            masg: '查询成功',
            data: res
        }
    },
    //添加
    "addMaInfo": async(ctx, next) => {
        let name = ctx.request.body.name
        let info = ctx.request.body.info

        // 插入语句
        let addsql = `INSERT INTO maintainInfo VALUES(id, ?,?,? )`;

        let addSqlParams = [name, getNowTime(new Date()), info];

        //需要插入的数据 
        let res = await db.query(addsql, addSqlParams)
            // 返回数据
        ctx.body = {
            code: 200,
            msg: '添加成功'
        }
    },
    // 删除
    "removeMaInfo": async(ctx, next) => {
        let id = ctx.query.id
        let sql = `DELETE FROM maintainInfo where id= '${id}' `
        let res = db.query(sql)
        ctx.body = {
            code: 200,
            msg: '删除成功'
        }

    },
    //修改信息 
    "editMaInfo": async(ctx, next) => {
        let name = ctx.request.body.name
        let info = ctx.request.body.info
        let date1 = ctx.request.body.date
        let id = ctx.request.body.id
        let modSql = 'UPDATE maintainInfo SET name = ?,date = ?, info = ?  WHERE id = ?';

        let modSqlParams = [name, getNowTime(date1), info, id];

        let res = await db.query(modSql, modSqlParams)

        ctx.body = {
            code: 200,
            msg: '修改成功'
        }



    }

}