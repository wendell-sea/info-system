const db = require('../../db/index');


module.exports = {
    // 获取侧边栏菜单
    "menus": async(ctx) => {
        let sql1 = `SELECT * FROM  menus `;
        let res1 = await db.query(sql1)

        let sql2 = `SELECT * FROM  menuuser `;
        let res2 = await db.query(sql2)

        let sql3 = `SELECT * FROM   menuhomeuser `;
        let res3 = await db.query(sql3)

        let sql4 = `SELECT * FROM   menueq `;
        let res4 = await db.query(sql4)

        let sql5 = `SELECT * FROM   menuqu `;
        let res5 = await db.query(sql5)


        let sql6 = `SELECT * FROM   menustall `;
        let res6 = await db.query(sql6)


        for (let k in res1) {
            let zero = res1[0]
            let one = res1[1]
            let two = res1[2]
            let three = res1[3]
            let four = res1[4]

            zero.children = res2
            one.children = res3
            two.children = res4
            three.children = res5
            four.children = res6

            ctx.body = {
                code: 200,
                msg: '获取成功',
                data: res1
            }
            return
        }






    }
}