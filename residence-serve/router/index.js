// 路由
const Router = require('koa-router');
// 左侧菜单接口
const menus = require('./mue/index')
    // 用户接口
const user = require('./user/index');
// 住户信息接口
const homeuser = require('./homeuser/index');
// 设备管理接口
const eq = require('./equipment/index');
// 设备维修x信息接口
const maInfo = require('./maintainInfo/index');
// 投诉建议接口
const quinfo = require('./querulous/index');
// 车位管理接口
const carstall = require('./carstall/index');


const router = new Router();


// 登录
router.get('/login', user.login);
// 查询所有
router.get('/queryuser', user.query);
// 添加
router.post('/adduser', user.add);
// 搜索
router.get('/searchuser', user.search);
//修改
router.put('/edituser', user.edit);
//删除
router.get('/removeuser', user.remove);
//根据id查询
router.get('/findindexuser', user.findIndex);


router.get('/menus', menus.menus)

//可视化查询
router.get('/visual', homeuser.visual);
//查询所有
router.get('/queryall', homeuser.queryall);
// 关键词查询 搜索功能
router.get('/seachKey', homeuser.seachKey);
// 根据id 删除当前用户
router.delete('/remove', homeuser.remove);
// 添加数据
router.post('/addHomeUser', homeuser.addHomeUser);

// 图片上传 添加接口
router.post('/upload', eq.upload);
// 查询所有
router.get('/queryEqAll', eq.queryAll);
// 添加
router.post('/addData', eq.addData);
// 删除
router.delete('/removeEq', eq.removeEq);
// 搜索
router.get('/searchEq', eq.search);
//修改
router.put('/editState', eq.editState);


//查询所有
router.get('/queryMaInfo', maInfo.queryMaInfo);
//添加
router.post('/addMaInfo', maInfo.addMaInfo);
//删除
router.delete('/removeMaInfo', maInfo.removeMaInfo);
//修改
router.put('/editMaInfo', maInfo.editMaInfo);


// 未处理
router.get('/queryAllQu', quinfo.queryAllQu);
// 修改状态
router.put('/disposeInfo', quinfo.disposeInfo);
// 已处理
router.get('/untreated', quinfo.untreated);


//所有公共车位
router.get('/allstall', carstall.allstall);
//添加
router.post('/addstall', carstall.addstall);
//查询所有私人车位
router.get('/allownstall', carstall.allownstall)

module.exports = router