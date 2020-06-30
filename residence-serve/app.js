const Koa = require('koa');

const router = require('./router/index')
    // 解析 post 参数的包
const koaBody = require('koa-body');
//路径模块
const path = require('path');
//静态文件资源
const koaStatic = require('koa-static');
//数据库
require('./db/index');

const app = new Koa();
// 注册静态资源  开放文件
app.use(koaStatic(path.join(__dirname, 'public')));
// 设置所有域名跨域
app.use(async(ctx, next) => {
    await ctx.set('Access-Control-Allow-Origin', '*', ); //允许通过所有的 
    // 配置请求头信息
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, ');
    // 请求能用的方法
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    // 如果用户的请求方法 是 OPTIONS（获取服务器支持的HTTP请求方法以及检查服务器性能的请求方法） 则返回 200 是成功的
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        //否则继续执行下去
        await next();
    }
});
// 解析post 参数
app.use(koaBody({
    // 支持文件上传模式
    multipart: true,
    formidable: {
        //上传到的路径
        uploadDir: path.join(__dirname, '/public/uploads'),
        //保留拓展名
        keepExtensions: true,
    }
}));
//注册路由 
app.use(router.routes()).use(router.allowedMethods());
//监听端口
app.listen(3000, () => {
    console.log('sever is ok');

});