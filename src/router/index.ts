import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/test',
    },
    {
      path: '/index',
      redirect: '/test',
    },
    {
      path: '/test',
      name: 'test',
      meta: { title: '测试页面' },
      component: () => import('@/views/test/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: '登录页面' },
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/tool/qrcode',
      name: 'qrcode',
      meta: { title: '二维码生成器' },
      component: () => import('@/views/tool/qrcode/index.vue'),
    },
  ],
})

export default router
