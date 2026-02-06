import { defineStore } from "pinia";
import { employeeService } from "@/api/employeeService";

export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: [],
    isLoading: false,
    error: null,
  }),
  actions: {

     // Fetch all employees from backend
    async fetchEmployees() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await employeeService.getAllEmployees();
        this.employees = data;
      } catch (error) {
        this.error = error.message || 'Failed to fetch employees';
        console.error('Error fetching employees:', error);
      } finally {
        this.isLoading = false;
      }
    },

     // Fetch single employee
    async fetchEmployee(employeeId) {
      try {
        return await employeeService.getEmployee(employeeId);
      } catch (error) {
        console.error(`Error fetching employee ${employeeId}:`, error);
        throw error;
      }
    },

     // Add new employee
    async addEmployee(employeeData) {
      try {
        const result = await employeeService.addEmployee(employeeData);
        // Refresh the employee list
        await this.fetchEmployees();
        return result;
      } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
      }
    },
    // Module1 code
    // addEmployee(employee) {
    //     this.employees.push(employee);
    // },

  // Update employee
    async updateEmployee(employeeId, employeeData) {
      try {
        const result = await employeeService.updateEmployee(employeeId, employeeData);
        // Refresh the employee list
        await this.fetchEmployees();
        return result;
      } catch (error) {
        console.error(`Error updating employee ${employeeId}:`, error);
        throw error;
      }
    },

 // Delete employee
    async deleteEmployee(employeeId) {
      try {
        const result = await employeeService.deleteEmployee(employeeId);
        // Remove from local state
        this.employees = this.employees.filter(emp => emp.employee_id !== employeeId);
        return result;
      } catch (error) {
        console.error(`Error deleting employee ${employeeId}:`, error);
        throw error;
      }
    },
  },


  //module1 code
  //   removeEmployee(employeeId) {
  //       this.employees = this.employees.filter(emp => emp.id !== employeeId);
  //   },
  // },


getters: {
    employeeCount: (state) => state.employees.length,

  // Get employee by ID
    getEmployeeById: (state) => (id) => {
      return state.employees.find(emp => emp.employee_id === id);
    },
    
    // Get unique departments
    uniqueDepartments: (state) => {
      const departments = new Set(state.employees.map(emp => emp.department));
      return Array.from(departments).sort();
    }
  },
});
