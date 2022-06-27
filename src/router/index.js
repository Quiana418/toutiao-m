/* import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  //路由懒加载
  //登录页面的路由
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
  },
  //我的--页面路由 作为父路由
  {
    path: "/",
    // name: "layout",
    redirect: "/home",
    component: () => import("@/views/Layout"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/Home"),
      },
      { path: "/qa", name: "qa", component: () => import("@/views/Qa") },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/Video"),
      },
      { path: "/my", name: "my", component: () => import("@/views/My") },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    redirect: '/home',
    name: 'layout', // 如果父路由有默认子路由，那它的 name 没有意义
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '/home', // 默认子路由，只能有1个
        name: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/Qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/My')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
