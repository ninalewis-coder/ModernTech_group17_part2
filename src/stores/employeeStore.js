import { defineStore } from "pinia";

export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: [],
  }),
  actions: {
    addEmployee(employee) {
        this.employees.push(employee);
    },
    removeEmployee(employeeId) {
        this.employees = this.employees.filter(emp => emp.id !== employeeId);
    },
  },
getters: {
    employeeCount: (state) => state.employees.length,
  },
});