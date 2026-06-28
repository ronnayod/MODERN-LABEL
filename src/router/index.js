import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import CategoryPage from '../views/CategoryPage.vue'
import ProductDetail from '../views/ProductDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/category/:gender', name: 'Category', component: CategoryPage, props: true },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
