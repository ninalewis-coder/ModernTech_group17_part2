import { createRouter, createWebHistory } from "vue-router"
import AttendanceView from "../views/AttendanceView.vue"
import EmployeesView from "../views/EmployeesView.vue"
import HomeView from "../views/HomeView.vue"
import LeaveView from "../views/LeaveView.vue"
import PayrollView from '../views/PayrollView.vue'
import ReviewView from '../views/ReviewView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/employees', name: 'employees', component: EmployeesView },
  { path: '/payroll', name: 'payroll', component: PayrollView },
  { path: '/leave', name: 'leave', component: LeaveView },
  { path: '/attendance', name: 'attendance', component: AttendanceView },
  { path: '/reviews', name: 'reviews', component: ReviewView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
