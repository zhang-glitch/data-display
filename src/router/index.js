import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import("../views/home.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
