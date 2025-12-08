import { createRouter, createWebHistory } from "vue-router"
import AttendanceView from "../views/AttendanceView.vue"
import EmployeeView from "../views/EmployeeView.vue"
import HomeView from "../views/HomeView.vue"
import LeaveView from "../views/LeaveView.vue"
import PayrollView from '../views/PayrollView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/employees', name: 'employees', component: EmployeeView },
  { path: '/payroll', name: 'payroll', component: PayrollView },
  { path: '/leave', name: 'leave', component: LeaveView },
  { path: '/attendance', name: 'attendance', component: AttendanceView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
