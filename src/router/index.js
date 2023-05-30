import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Navigation from '../views/Navigation/Navigation'
import ScheduleMgt from '../views/Schedule/ScheduleMgt.vue'
import CourseMgt from '../views/Course/CourseMgt.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/navigation',
    name: 'navigation',
    component: Navigation
  },
  {
    path:'/schedule',
    name: 'schedule',
    component: ScheduleMgt
  },
  {
    path:'/course',
    name: 'course',
    component: CourseMgt
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

