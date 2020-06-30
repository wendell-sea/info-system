import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>
    import ('@/views/Login.vue');

const Home = () =>
    import ('@/views/Home.vue');

const Welcome = () =>
    import ('@/views/Welcome.vue');

const User = () =>
    import ('@/views/user/User.vue');

const HomeList = () =>
    import ('@/views/homeuser/HomeList.vue');

const HomeAll = () =>
    import ('@/views/homeuser/HomeAll.vue');

const equipmentList = () =>
    import ('@/views/equipment/equipmentList.vue');

const equipmentInfo = () =>
    import ('@/views/equipment/equipmentInfo.vue');

const QuList = () =>
    import ('@/views/querulous/QuList.vue');

const SolveList = () =>
    import ('@/views/querulous/SolveList.vue');

const CarSeat = () =>
    import ('@/views/park/CarSeat.vue');

const OwnSeat = () =>
    import ('@/views/park/OwnSeat.vue');

Vue.use(VueRouter)
const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
        path: '/home',
        component: Home,
        children: [
            { path: '/welcome', component: Welcome },
            { path: '/user', component: User },
            { path: '/homelist', component: HomeList },
            { path: '/homeall', component: HomeAll },
            { path: '/eqlist', component: equipmentList },
            { path: '/eqinfo', component: equipmentInfo },
            { path: '/quList', component: QuList },
            { path: '/solvelist', component: SolveList },
            { path: '/allstall', component: CarSeat },
            { path: '/mystall', component: OwnSeat },
        ]
    }


]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
    routes,
    mode: 'history',
})

// 判断当前是否登录 
router.beforeEach((to, from, next) => {
    //如果当前加入的不是 登录页面 
    if (to.path !== '/login') {
        let token = window.sessionStorage.getItem('token')
            // 判断当前有没有token
        if (token) {
            // 有的话就继续执行下去
            next();
        } else {
            // 没有的话 跳转 登录页面
            next('/login');

        }
    } else {
        next()
    }

})

export default router