import axios from 'axios';

const API_BASE_URL = 'http://localhost:5050';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const attendanceService = {
    // Get all attendance records
    async getAllAttendance() {
        try {
            const response = await apiClient.get('/attendance');
            return response.data;
        } catch (error) {
            console.error('Error fetching attendance:', error);
            throw error;
        }
    },

    // Get attendance by employee
    async getAttendanceByEmployee(employeeId) {
        try {
            const response = await apiClient.get(`/attendance/employee/${employeeId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching attendance for employee ${employeeId}:`, error);
            throw error;
        }
    },

    // Add attendance
    async addAttendance(attendanceData) {
        try {
            const response = await apiClient.post('/attendance', attendanceData);
            return response.data;
        } catch (error) {
            console.error('Error adding attendance:', error);
            throw error;
        }
    },

    // Update attendance
    async updateAttendance(attendanceId, status) {
        try {
            const response = await apiClient.put(`/attendance/${attendanceId}`, { status });
            return response.data;
        } catch (error) {
            console.error(`Error updating attendance ${attendanceId}:`, error);
            throw error;
        }
    },

    // Delete attendance
    async deleteAttendance(attendanceId) {
        try {
            const response = await apiClient.delete(`/attendance/${attendanceId}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting attendance ${attendanceId}:`, error);
            throw error;
        }
    }
};

export { attendanceService };
