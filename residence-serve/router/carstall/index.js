const db = require('../../db/index.js');
const getNowTime = require('../../dateFormt/index.js')

module.exports = {
    //   分页查询所有公共停车卡信息
    "allstall": async(ctx, next) => {
        // 用户传递过来的参数 页码  默认为1 第一页
        let page = ctx.query.page || 1;
        // 计算当前从哪里开始查询
        let start = (page - 1) * 10;
        // sql 语句 查询所有
        let sqlTotal = `SELECT * FROM  comstalls `;
        // sql 语句查询指定页码
        let sql = `SELECT * FROM  comstalls limit ${start} , 10`;

        let res = await db.query(sql)
        let total = await db.query(sqlTotal)

        res.forEach(v => {
            if (v.enddate <= new Date()) {
                v.state = '1'
            } else {
                v.state = '0'
            }
        })

        ctx.body = {
            code: 200,
            msg: '获取成功',
            total: total.length,
            page: ctx.query.page,
            data: res
        }

    },
    //  添加
    "addstall": async(ctx, next) => {

        let name = ctx.request.body.name
        let carnm = ctx.request.body.carnm
        let enddate = ctx.request.body.enddate

        // 插入语句
        let addsql = `INSERT INTO comstalls VALUES(id, ?,?,?,? )`;
        let addSqlParams = [name, carnm, getNowTime(new Date()), getNowTime(enddate)];
        //需要插入的数据 
        let res = await db.query(addsql, addSqlParams)
            // 返回数据
        ctx.body = {
            code: 200,
            msg: '添加成功'
        }

    },
    //   分页查询所有私人车位
    "allownstall": async(ctx) => {
        // 用户传递过来的参数 页码  默认为1 第一页
        let page = ctx.query.page || 1;
        // 计算当前从哪里开始查询
        let start = (page - 1) * 10;
        // sql 语句 查询所有
        let sqlTotal = `SELECT * FROM  ownstall `;
        // sql 语句查询指定页码
        let sql = `SELECT * FROM  ownstall limit ${start} , 10`;

        let res = await db.query(sql)
        let total = await db.query(sqlTotal)

        ctx.body = {
            code: 200,
            msg: '获取成功',
            total: total.length,
            page: ctx.query.page,
            data: res
        }

    }
}