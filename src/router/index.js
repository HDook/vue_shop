import Vue from 'vue'
import VueRouter from 'vue-router'
// import Echarts from '@/components/echarts/Echarts'
const Echarts = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/echarts/Echarts')
// import Login from '../components/Login'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login')
// import Home from '../components/Home'
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home')
// import Welcome from '@/components/Welcome'
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome')
// import Users from '@/components/user/Users'
const Users = () => import(/* webpackChunkName: "user_rights_roles" */ '../components/user/Users')
// import Rights from '@/components/power/Rights'
const Rights = () => import(/* webpackChunkName: "user_rights_roles" */ '../components/power/Rights')
// import Roles from '@/components/power/Roles'
const Roles = () => import(/* webpackChunkName: "user_rights_roles" */ '../components/power/Roles')
// import Cate from '@/components/goods/Cate'
const Cate = () => import(/* webpackChunkName: "cate_params_list" */ '../components/goods/Cate')
// import Params from '@/components/goods/Params'
const Params = () => import(/* webpackChunkName: "cate_params_list" */ '../components/goods/Params')
// import List from '@/components/goods/List'
const List = () => import(/* webpackChunkName: "cate_params_list" */ '../components/goods/List')
// import Add from '@/components/goods/Add'
const Add = () => import(/* webpackChunkName: "add_order_report" */ '../components/goods/Add')
// import Order from '@/components/order/Order'
const Order = () => import(/* webpackChunkName: "add_order_report" */ '../components/order/Order')
// import Report from '@/components/report/Report'
const Report = () => import(/* webpackChunkName: "add_order_report" */ '../components/report/Report')
const Index = () => import(/* webpackChunkName: "index" */ '../components/index/Index')

Vue.use(VueRouter)
// const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3YW5nIiwiY3JlYXRlZCI6MTQ4OTA3OTk4MTM5MywiZXhwIjoxNDg5Njg0NzgxfQ.RC-BYCe_UZ2URtWddUpWXIp4NMsoeq2O6UF-8tVplqXY1-CI9u1-a-9DAAJGfNWkHE81mpnR3gXzfrBAB3WUAg'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/users',
          component: Users
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/categories',
          component: Cate
        },
        {
          path: '/params',
          component: Params
        },
        {
          path: '/goods',
          component: List
        },
        {
          path: '/goods/add',
          component: Add
        },
        {
          path: '/orders',
          component: Order
        },
        {
          path: '/reports',
          component: Report
        },
        {
          path: '/echarts',
          component: Echarts
        }

      ]
    }
  ]
})
// 挂载路由守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
//  from 代表从哪个路径跳转而来
//  next是下一个函数，表示放行
//  next()放行，next('/login')强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  // if (tokenStr !== token) return next('/login')
  next()
})
export default router
