import axios from 'axios';

const API_BASE_URL = 'http://localhost:5050';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const leaveService = {
    // Get all leave requests
    async getLeaveRequests() {
        try {
            const response = await apiClient.get('/leave');
            return response.data;
        } catch (error) {
            console.error('Error fetching leave requests:', error);
            throw error;
        }
    },

    // Get leave requests by employee
    async getLeaveByEmployee(employeeId) {
        try {
            const response = await apiClient.get(`/leave/${employeeId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching leave for employee ${employeeId}:`, error);
            throw error;
        }
    },

    // Submit leave request
    async submitLeave(leaveData) {
        try {
            const response = await apiClient.post('/leave', leaveData);
            return response.data;
        } catch (error) {
            console.error('Error submitting leave request:', error);
            throw error;
        }
    },

    // Update leave status
    async updateLeaveStatus(leaveId, status) {
        try {
            const response = await apiClient.put(`/leave/${leaveId}`, { status });
            return response.data;
        } catch (error) {
            console.error(`Error updating leave status ${leaveId}:`, error);
            throw error;
        }
    },

    // Delete leave request
    async deleteLeaveRequest(leaveId) {
        try {
            const response = await apiClient.delete(`/leave/${leaveId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting leave request ${leaveId}:`, error);
            throw error;
        }
    }
};

export { leaveService };
