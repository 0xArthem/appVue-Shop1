import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user-settings',
    name: 'UserSettings',
    component: () => import('../views/UserSettings.vue')
  },
  {
    path: '/wish-list',
    name: 'WishList',
    component: () => import('../views/UserSettings.vue')
  },
  {
    path: '/shopping-cart',
    name: 'ShoppingCart',
    component: () => import('../views/ShoppingCart.vue')
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
