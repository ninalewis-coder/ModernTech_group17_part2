import { defineStore } from "pinia";
import { leaveService } from "../api/leaveService";

export const useLeaveStore = defineStore("leave", {
  state: () => ({
    leaveRequests: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchLeaveRequests() {
      this.loading = true;
      try {
        this.leaveRequests = await leaveService.getLeaveRequests();
        this.error = null;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async submitLeaveRequest(data) {
      try {
        await leaveService.submitLeave(data);
        await this.fetchLeaveRequests();
      } catch (err) {
        this.error = err.message;
        throw err;
      }
    },

    async updateLeaveStatus(id, status) {
      try {
        await leaveService.updateLeaveStatus(id, status);
        const request = this.leaveRequests.find(req => req.leave_id === id);
        if (request) {
          request.status = status;
        }
      } catch (err) {
        this.error = err.message;
        throw err;
      }
    },

    async deleteLeaveRequest(id) {
      try {
        await leaveService.deleteLeaveRequest(id);
        this.leaveRequests = this.leaveRequests.filter(req => req.leave_id !== id);
      } catch (err) {
        this.error = err.message;
        throw err;
      }
    },
  },
  getters: {
    pendingRequests: (state) => state.leaveRequests.filter(req => req.status === 'Pending'),
    approvedRequests: (state) => state.leaveRequests.filter(req => req.status === 'Approved'),
    deniedRequests: (state) => state.leaveRequests.filter(req => req.status === 'Denied'),
    totalRequests: (state) => state.leaveRequests.length,
  },
});
