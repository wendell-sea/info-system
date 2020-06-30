const db = require('../../db/index');

const jwt = require('jsonwebtoken')

module.exports = {
    //  登录 
    "login": async(ctx, next) => {
        //sql 查询语句
        let sql = `SELECT * FROM user  where username = ${'username'} `
            // 查询数据库
        let res = await db.query(sql);
        // query 信息 前端提交
        let username = ctx.query.username;
        let password = ctx.query.password;


        for (let i = 0; i < res.length; i++) {
            if (res[i].username === username && res[i].password === password) {
                // jwt 密钥
                let secret = 'xxoojjtt';
                //生成token
                let token = jwt.sign({ username, password }, secret, { expiresIn: '1d' })
                    // 返回数据
                ctx.body = {
                    code: 200,
                    msg: '登录成功',
                    token: token,
                    restrict: res[i].restrict

                }
                return
            }
            // 错误信息
            ctx.body = {
                code: 404,
                msg: '账号密码错误'
            }
        }
    },
    // 用户列表
    "query": async(ctx, next) => {

        // 用户传递过来的参数 页码  默认为1 第一页
        let page = ctx.query.page || 1;
        // 计算当前从哪里开始查询
        let start = (page - 1) * 8;
        // sql 语句 查询所有
        let sqlTotal = `SELECT * FROM  user `;
        // sql 语句查询指定页码
        let sql = `SELECT * FROM  user limit ${start} , 8`;
        // 执行 页码查询
        let res = await db.query(sql);
        // 执行 所有查询
        let total = await db.query(sqlTotal);

        let resdata = res.map(v => {
                return {
                    id: v.id,
                    username: v.username,
                    restrict: v.restrict
                }
            })
            // 返回数据
        ctx.body = {
            code: 200,
            total: total.length,
            page: ctx.query.page,
            masg: '查询成功',
            data: resdata
        }

    },
    // 添加用户
    "add": async(ctx, next) => {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;
        let restrict = ctx.request.body.restrict;
        // 插入语句
        let addsql = `INSERT INTO user VALUES(id,?,?,?)`;
        //需要插入的数据
        let addSqlParams = [username, password, restrict];
        //执行插入
        let res = await db.query(addsql, addSqlParams)
            // 返回结果
        ctx.body = {
            code: 200,
            msg: '添加成功'
        }





    },
    // 搜索
    "search": async(ctx, next) => {
        // query 提交信息
        let username = ctx.query.username;
        // sql 搜索关键词语句
        let sql = `SELECT * FROM user WHERE username  LIKE '%${username}%' `;
        // 查询
        let res = await db.query(sql);
        console.log(res);

        // 返回查询的数据
        ctx.body = {
            code: 200,
            data: res,
            total: res.length
        }
    },
    // 修改 用户信息 （根据id）
    "edit": async(ctx, next) => {
        let username = ctx.request.body.username;
        let password = ctx.request.body.password;
        let restrict = ctx.request.body.restrict;
        let id = ctx.request.body.id;
        let modSql = 'UPDATE user SET username = ?,password = ?,`restrict` = ?  WHERE id = ?';

        let modSqlParams = [username, password, restrict, id];
        let res = await db.query(modSql, modSqlParams)
        ctx.body = {
            code: 200,
            msg: '修改成功'
        }





    },
    //根据id查询
    "findIndex": async(ctx, next) => {
        // query 提交信息
        let id = ctx.query.id;
        // sql 语句
        let sql = `SELECT * FROM user where id= "${id}"`;
        //  执行sql 查询
        let res = await db.query(sql);
        // 删除 当前查到的数据
        ctx.body = {
            code: 200,
            msg: '查询成功',
            data: res

        }
    },
    // 删除 用户信息 （根据id）
    "remove": async(ctx, next) => {
        // query 提交信息
        let id = ctx.query.id;
        // sql 语句
        let sql = `DELETE FROM user where id= "${id}"`;
        //  执行sql 查询
        let res = await db.query(sql);
        // 删除 当前查到的数据
        ctx.body = {
            code: 200,
            msg: '删除成功'
        }

    }


}