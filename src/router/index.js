import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home'
import personal from '../views/Personal'
import commission from '../views/Commission'
import integral from '../views/Integral'
import commissionRules from '../views/CommissionRules'
import chongzhiIntegral from '../views/chongzhiIntegral'
import RechargeRecord from '../views/RechargeRecord'
import InvitationList from '../views/InvitationList'
import WelfareCentre from '../views/WelfareCentre'
import Score from '../views/Score'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: home
  },
  {
    path: '/personal',
    name: 'personal',
    meta: {
      title: '个人中心'
    },
    component: personal
  },
  {
    path: '/commission',
    name: 'commission',
    meta: {
      title: '查看佣金'
    },
    component: commission
  },
  {
    path: '/integral',
    name: 'integral',
    meta: {
      title: '积分明细'
    },
    component: integral
  },
  {
    path: '/commissionRules',
    name: 'commissionRules',
    meta: {
      title: '佣金规则'
    },
    component: commissionRules
  },
  {
    path: '/chongzhiIntegral',
    name: 'chongzhiIntegral',
    meta: {
      title: '充值积分'
    },
    component: chongzhiIntegral
  },
  {
    path: '/RechargeRecord',
    name: 'RechargeRecord',
    meta: {
      title: '充值记录'
    },
    component: RechargeRecord
  },
  {
    path: '/InvitationList',
    name: 'InvitationList',
    meta: {
      title: '邀请列表'
    },
    component: InvitationList
  },
  {
    path: '/WelfareCentre',
    name: 'WelfareCentre',
    meta: {
      title: '福利中心'
    },
    component: WelfareCentre
  },
  {
    path: '/score',
    name: 'score',
    meta: {
      title: '获取积分'
    },
    component: Score
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  // if (to.path === '/login') {
  //   next()
  // } else {
  //   let token = localStorage.getItem('Authorization')

  //   if (token === 'null' || token === '') {
  //     next('/login')
  //   } else {
  //     next()
  //   }
  // }
  to.meta.title && (document.title = to.meta.title)
  next()
})

export default router
