import axios from 'axios';

const API_BASE_URL = 'http://localhost:5050';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Employee API methods
const employeeService = {
    // Get all employees
    async getAllEmployees() {
        try {
            const response = await apiClient.get('/employee');
            return response.data;
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    },

    // Get single employee
    async getEmployee(employeeId) {
        try {
            const response = await apiClient.get(`/employee/${employeeId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching employee ${employeeId}:`, error);
            throw error;
        }
    },

    // Add new employee
    async addEmployee(employeeData) {
        try {
            const response = await apiClient.post('/employee', employeeData);
            return response.data;
        } catch (error) {
            console.error('Error adding employee:', error);
            throw error;
        }
    },

    // Update employee
    async updateEmployee(employeeId, employeeData) {
        try {
            const response = await apiClient.patch(`/employee/${employeeId}`, employeeData);
            return response.data;
        } catch (error) {
            console.error(`Error updating employee ${employeeId}:`, error);
            throw error;
        }
    },

    // Delete employee
    async deleteEmployee(employeeId) {
        try {
            const response = await apiClient.delete(`/employee/${employeeId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting employee ${employeeId}:`, error);
            throw error;
        }
    }
};

export { employeeService };