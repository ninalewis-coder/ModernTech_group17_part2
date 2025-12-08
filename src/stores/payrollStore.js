import { defineStore } from "pinia";

export const usePayrollStore = defineStore("payroll", {
  state: () => ({
    payrollRecords: [],
  }),
  actions: {
    addPayrollRecord(record) {
      this.payrollRecords.push(record);
    },
    updatePayrollRecord(employeeId, updatedData) {
      const record = this.payrollRecords.find(rec => rec.employeeId === employeeId);
      if (record) {
        Object.assign(record, updatedData);
      }
    },
    removePayrollRecord(employeeId) {
      this.payrollRecords = this.payrollRecords.filter(rec => rec.employeeId !== employeeId);
    },
    calculateNetSalary(employeeId, baseSalary, hoursWorked, leaveDeductions) {
      const hourlyRate = baseSalary / 160; // Assuming 160 work hous per month
      const deductionAmount = hourlyRate * leaveDeductions;
      return baseSalary - deductionAmount;
    },
  },
  getters: {
    totalPayroll: (state) => {
      return state.payrollRecords.reduce((sum, rec) => sum + rec.finalSalary, 0);
    },
    averageSalary: (state) => {
      if (state.payrollRecords.length === 0) return 0;
      const total = state.payrollRecords.reduce((sum, rec) => sum + rec.finalSalary, 0);
      return Math.round(total / state.payrollRecords.length);
    },
    totalHours: (state) => {
      return state.payrollRecords.reduce((sum, rec) => sum + rec.hoursWorked, 0);
    },
    getPayrollByEmployee: (state) => (employeeId) => {
      return state.payrollRecords.find(rec => rec.employeeId === employeeId);
    },
  },
});
