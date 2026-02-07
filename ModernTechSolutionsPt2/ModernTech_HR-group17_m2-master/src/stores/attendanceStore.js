import { defineStore } from "pinia";
import { attendanceService } from "../api/attendanceService";

export const useAttendanceStore = defineStore("attendance", {
    state: () => ({
        attendanceRecords: [],
        loading: false,
        error: null,
    }),
    actions: {
        async fetchAttendance() {
            this.loading = true;
            try {
                this.attendanceRecords = await attendanceService.getAllAttendance();
                this.error = null;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        async fetchAttendanceByEmployee(employeeId) {
            this.loading = true;
            try {
                const data = await attendanceService.getAttendanceByEmployee(employeeId);
                // Optionally merge or replace specific records
                this.attendanceRecords = data;
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        async addAttendance(data) {
            try {
                await attendanceService.addAttendance(data);
                await this.fetchAttendance(); // Refresh list
            } catch (err) {
                this.error = err.message;
                throw err;
            }
        },

        async updateAttendance(id, status) {
            try {
                await attendanceService.updateAttendance(id, status);
                const record = this.attendanceRecords.find(r => r.attendance_id === id);
                if (record) {
                    record.status = status;
                }
            } catch (err) {
                this.error = err.message;
                throw err;
            }
        },

        async deleteAttendance(id) {
            try {
                await attendanceService.deleteAttendance(id);
                this.attendanceRecords = this.attendanceRecords.filter(r => r.attendance_id !== id);
            } catch (err) {
                this.error = err.message;
                throw err;
            }
        }
    },
    getters: {
        getAttendanceById: (state) => (id) => state.attendanceRecords.find(r => r.attendance_id === id),
    }
});
