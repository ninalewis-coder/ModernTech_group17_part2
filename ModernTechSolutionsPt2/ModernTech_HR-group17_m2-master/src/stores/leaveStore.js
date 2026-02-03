import { defineStore } from "pinia";

export const useLeaveStore = defineStore("leave", {
  state: () => ({
    leaveRequests: [],
  }),
  actions: {
    addLeaveRequest(request) {
      this.leaveRequests.push(request);
    },
    updateLeaveRequest(requestId, status) {
      const request = this.leaveRequests.find(req => req.id === requestId);
      if (request) {
        request.status = status;
      }
    },
    removeLeaveRequest(requestId) {
      this.leaveRequests = this.leaveRequests.filter(req => req.id !== requestId);
    },
  },
  getters: {
    pendingRequests: (state) => state.leaveRequests.filter(req => req.status === 'pending'),
    approvedRequests: (state) => state.leaveRequests.filter(req => req.status === 'approved'),
    rejectedRequests: (state) => state.leaveRequests.filter(req => req.status === 'rejected'),
    totalRequests: (state) => state.leaveRequests.length,
  },
});
