const mysql = require('mysql');


function __connection() {
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'xxxxxx',
        password: 'xxxxxxxx',
        database: 'admin'
    });
    connection.connect();
    return connection;
};

exports.query = (sql, parmas = null) => {
    // 获取数据库链接对象
    let connection = __connection();
    return new Promise((reject, resolve) => {
        // 执行SQL语句
        connection.query(sql, parmas, (error, results, fields) => {
            if (error) throw error;
            reject(results);
        });
        // 关闭链接
        connection.end();
    })
}