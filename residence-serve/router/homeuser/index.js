const db = require('../../db/index');
const getNowTime = require('../../dateFormt/index.js')
module.exports = {
    //可视化图标查询
    "visual": async(ctx, next) => {
        // 1栋所有用户 
        let sql1 = `SELECT * FROM homeUsers WHERE floor LIKE '1%' `;
        let res1 = await db.query(sql1);
        let fool1 = res1.length
            // 2栋所有用户
        let sql2 = `SELECT * FROM homeUsers WHERE floor LIKE '2%' `;
        let res2 = await db.query(sql2);
        let fool2 = res2.length
            // 3栋所有用户
        let sql3 = `SELECT * FROM homeUsers WHERE floor LIKE '3%' `;
        let res3 = await db.query(sql3);
        let fool3 = res3.length
            // 5栋所有用户
        let sql5 = `SELECT * FROM homeUsers WHERE floor LIKE '5%' `;
        let res5 = await db.query(sql5);
        let fool5 = res5.length
            // 6栋所有用户
        let sql6 = `SELECT * FROM homeUsers WHERE floor LIKE '6%' `;
        let res6 = await db.query(sql6);
        let fool6 = res6.length
            // 7栋所有用户
        let sql7 = `SELECT * FROM homeUsers WHERE floor LIKE '7%' `;
        let res7 = await db.query(sql7);
        let fool7 = res7.length
            // 返回 数据
        ctx.body = {
            code: 200,
            data: {
                fool1,
                fool2,
                fool3,
                fool5,
                fool6,
                fool7,
            }
        }


    },
    //查询所有 分页 limit 每一页返回6条数据
    "queryall": async(ctx, next) => {
        // 用户传递过来的参数 页码  默认为1 第一页
        let page = ctx.query.page || 1;
        // 计算当前从哪里开始查询
        let start = (page - 1) * 6;
        // sql 语句 查询所有
        let sqlTotal = `SELECT * FROM  homeUsers `;
        // sql 语句查询指定页码
        let sql = `SELECT * FROM  homeUsers limit ${start} , 6`;
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
    //搜索关键词
    "seachKey": async(ctx, next) => {
        // 获取 用户输入的关键词
        let key = ctx.query.key
            // sql语句 (这是查询楼层所在的)
        let sql = `SELECT * FROM homeUsers WHERE floor  LIKE '%${key}%' `;
        // 执行查询楼层
        let res = await db.query(sql)
        console.log(key);

        ctx.body = {
            code: 200,
            msg: '查询成功',
            data: res,
            total: res.length
        }




    },
    //根据id 删除当前用户
    "remove": async(ctx, next) => {
        let id = ctx.query.id
        let sql = `DELETE FROM homeUsers where id= '${id}' `
        let res = db.query(sql)
        ctx.body = {
            code: 200,
            msg: '删除成功'
        }

    },
    //添加用户信息
    "addHomeUser": async(ctx, next) => {
        let name = ctx.request.body.name
        let floor = ctx.request.body.floor
        let phone = ctx.request.body.phone

        // 插入语句
        let addsql = `INSERT INTO homeUsers VALUES(id, ?,?,?,? )`;

        let addSqlParams = [name, getNowTime(new Date()), floor, phone];
        //需要插入的数据 
        let res = await db.query(addsql, addSqlParams)
            // 返回数据
        ctx.body = {
            code: 200,
            msg: '添加成功'
        }





    },

}