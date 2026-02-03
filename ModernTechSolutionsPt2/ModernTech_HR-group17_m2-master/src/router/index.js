import { createRouter, createWebHistory } from "vue-router"
import AttendanceView from "../views/AttendanceView.vue"
import EmployeesView from "../views/EmployeesView.vue"
import HomeView from "../views/HomeView.vue"
import LeaveView from "../views/LeaveView.vue"
import PayrollView from '../views/PayrollView.vue'
import ReviewView from '../views/ReviewView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { path: '/login', name: 'login', component: LoginView },
  { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/employees', name: 'employees', component: EmployeesView, meta: { requiresAuth: true } },
  { path: '/payroll', name: 'payroll', component: PayrollView, meta: { requiresAuth: true } },
  { path: '/leave', name: 'leave', component: LeaveView, meta: { requiresAuth: true } },
  { path: '/attendance', name: 'attendance', component: AttendanceView, meta: { requiresAuth: true } },
  { path: '/reviews', name: 'reviews', component: ReviewView, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  // If trying to access protected route without authentication, redirect to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } 
  // If already logged in and trying to access login page, redirect to home
  else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } 
  // Otherwise allow navigation
  else {
    next()
  }
})

export default router
