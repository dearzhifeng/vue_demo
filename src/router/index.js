import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Home from '../components/Home'
import Welcome from "../components/Welcome";
import Users from "../components/user/Users";
import Rights from "../components/power/Rights";
import Roles from "../components/user/Roles";
import Cate from "../components/goods/Cate";
import Params from "../components/goods/Params";
import GoodsList from "../components/goods/List";
import Add from "../components/goods/Add";
import Order from "../components/order/Order";
import Report from "../components/report/Report";

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', component: Login},
  {
    path: '/home', component: Home, redirect: '/welcome', children: [
      {path: '/Welcome', component: Welcome},
      {path: '/Users', component: Users},
      { path: '/Rights', component: Rights },
      { path: '/Roles', component: Roles },
      { path: '/Categories' ,component: Cate },
      { path: '/Params' ,component: Params },
      { path: '/Goods',component:GoodsList},
      { path: '/Goods/Add',component: Add},
      { path: '/Orders',component: Order},
      { path: '/Reports',component: Report}
      ]
  }
]

const router = new VueRouter({
  routes
})

//挂载路由守护
router.beforeEach((to, from, next) => {

  if (to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem("token")
  if (!tokenStr) return next('/login')
  next()

})
export default router
