<template>
    <div class="leave-container">
        <div>
            <div class="col-md-12 col-sm-12 mb-12">
                <div class="card m-1" style="background-color: rgb(122, 108, 202);">
                    <div class="card-body" style="color:white">
                        <h5 class="card-title" style="font-size:xx-large;">
                            Leave Management
                        </h5>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-fluid">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#leaveModal">
                    <i class="bi bi-plus-circle"></i> Request Leave
                </button>
            </div>

            <!-- Request Statistics -->
            <div class="row mb-4">
                <div class="col-md-4 mb-3">
                    <div class="card bg-warning text-white">
                        <div class="card-body text-center">
                            <h6 class="card-title">Pending Requests</h6>
                            <h2>{{ pendingCount }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="card bg-success text-white">
                        <div class="card-body text-center">
                            <h6 class="card-title">Approved Requests</h6>
                            <h2>{{ approvedCount }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <div class="card bg-danger text-white">
                        <div class="card-body text-center">
                            <h6 class="card-title">Denied Requests</h6>
                            <h2>{{ deniedCount }}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Tabs for Different Views -->
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button 
                                class="nav-link active" 
                                @click="activeTab = 'all'"
                                :class="{ active: activeTab === 'all' }"
                            >
                                All Requests
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button 
                                class="nav-link" 
                                @click="activeTab = 'pending'"
                                :class="{ active: activeTab === 'pending' }"
                            >
                                Pending
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button 
                                class="nav-link" 
                                @click="activeTab = 'approved'"
                                :class="{ active: activeTab === 'approved' }"
                            >
                                Approved
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button 
                                class="nav-link" 
                                @click="activeTab = 'denied'"
                                :class="{ active: activeTab === 'denied' }"
                            >
                                Denied
                            </button>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th>Employee</th>
                                    <th>Leave Type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Duration</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="request in filteredLeaveRequests" :key="request.id">
                                    <td>{{ request.employeeName }}</td>
                                    <td>{{ request.leaveType }}</td>
                                    <td>{{ formatDate(request.startDate) }}</td>
                                    <td>{{ formatDate(request.endDate) }}</td>
                                    <td>{{ request.duration }} day(s)</td>
                                    <td>{{ request.reason }}</td>
                                    <td>
                                        <span :class="getStatusBadgeClass(request.status)">
                                            {{ request.status }}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            v-if="request.status === 'Pending'" 
                                            class="btn btn-sm btn-success me-1"
                                            @click="approveRequest(request.id)"
                                        >
                                            <i class="bi bi-check-circle me-1"></i> Approve
                                        </button>
                                        <button 
                                            v-if="request.status === 'Pending'" 
                                            class="btn btn-sm btn-danger"
                                            @click="denyRequest(request.id)"
                                        >
                                            Deny
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Request Leave Modal -->
    <div class="modal fade" id="leaveModal" tabindex="-1" aria-labelledby="leaveModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="leaveModalLabel">Submit Leave Request</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="submitLeaveRequest">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Employee *</label>
                            <select class="form-select" v-model="newRequest.employeeId" required>
                                <option value="">-- Choose an Employee --</option>
                                <option v-for="emp in employees" :key="emp.employee_id" :value="emp.employee_id">
                                    {{ emp.name }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Type of Leave *</label>
                            <select class="form-select" v-model="newRequest.leaveType" required>
                                <option value="">-- Select Type --</option>
                                <option value="Personal">Personal Leave</option>
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Maternity Leave">Maternity Leave</option>
                                <option value="Vacation">Vacation</option>
                                <option value="Family Responsibility">Family Responsibility</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label class="form-label">Date *</label>
                                <input 
                                    type="date"
                                    class="form-control"
                                    v-model="newRequest.startDate"
                                    required
                                />
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Reason *</label>
                            <textarea 
                                class="form-control" 
                                rows="3"
                                v-model="newRequest.reason"
                                required
                            ></textarea>
                        </div>

                        <div class="alert alert-info" v-if="calculateDays > 0">
                            Duration: {{ calculateDays }} day(s)
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="bi bi-x-circle me-1"></i> Cancel
                        </button>
                        <button type="submit" class="btn btn-success">
                            <i class="bi bi-check-circle me-1"></i> Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useLeaveStore } from '@/stores/leaveStore';
import { employeeService } from '@/api/employeeService';

const leaveStore = useLeaveStore();
const employees = ref([]);
const activeTab = ref('all');
const newRequest = ref({
    employeeId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
});

// Computed properties
const pendingCount = computed(() => leaveStore.pendingRequests.length);
const approvedCount = computed(() => leaveStore.approvedRequests.length);
const deniedCount = computed(() => leaveStore.deniedRequests.length); // Assuming 'Denied' is the status in DB

const filteredLeaveRequests = computed(() => {
    // Map requests to include employee name
    let requests = leaveStore.leaveRequests.map(r => {
        const emp = employees.value.find(e => e.employee_id === r.employee_id);
        
        // Calculate duration on the fly if not in DB, but DB has start/end usually
        // The DB schema had leave_date (single date?). 
        // Wait, schema check: "leave_date DATE", "reason VARCHAR".
        // It seems the DB only supports single day leave or start date?
        // "leave_request" table: leave_id, employee_id, leave_date, reason, status.
        // It does NOT have end_date. 
        // For now, we will assume leave_date is the start date or the only date.
        // We might need to adjust the frontend to match the schema or backend to match frontend.
        // The frontend expects start and end date.
        // I will map start and end date to leave_date for now to avoid breaking UI, 
        // but real fix implies DB change or Backend handling.
        // As I cannot change DB schema easily without migration, I will assume leave_date is start.
        
        return {
            id: r.leave_id, // Map leave_id to id
            employeeId: r.employee_id,
            employeeName: emp ? emp.name : 'Unknown',
            leaveType: r.reason, // Schema uses 'reason' for type/reason? 
            // Actually schema has 'reason'. Frontend has 'leaveType' AND 'reason'.
            // I'll map 'reason' from DB to 'leaveType' and 'reason' for display if needed.
            startDate: r.leave_date,
            endDate: r.leave_date, // Single date in DB
            duration: 1, // Defaulting to 1 as DB only has one date
            reason: r.reason, 
            status: r.status
        };
    });

    if (activeTab.value === 'all') return requests;
    if (activeTab.value === 'pending') return requests.filter(r => r.status === 'Pending');
    if (activeTab.value === 'approved') return requests.filter(r => r.status === 'Approved');
    if (activeTab.value === 'denied') return requests.filter(r => r.status === 'Denied');
    return requests;
});

const calculateDays = computed(() => {
    if (newRequest.value.startDate && newRequest.value.endDate) {
        const start = new Date(newRequest.value.startDate);
        const end = new Date(newRequest.value.endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    }
    return 0;
});

// Methods
const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const getStatusBadgeClass = (status) => {
    if (status === 'Approved') return 'badge bg-success';
    if (status === 'Denied') return 'badge bg-danger';
    return 'badge bg-warning text-dark';
};

const submitLeaveRequest = async () => {
    const requestData = {
        employee_id: newRequest.value.employeeId,
        leave_date: newRequest.value.startDate, // DB only has leave_date
        reason: `${newRequest.value.leaveType}: ${newRequest.value.reason}` // Combine type and reason for DB
    };
    
    try {
        await leaveStore.submitLeaveRequest(requestData);
        
        // Reset form
        newRequest.value = {
            employeeId: '',
            leaveType: '',
            startDate: '',
            endDate: '',
            reason: ''
        };
        
        // Close modal
        const modalElement = document.getElementById('leaveModal');
        // Check if bootstrap is available globally or need import. 
        // Usually attached to window in these templates.
        if (window.bootstrap) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
        }
        
        alert('Leave request submitted successfully!');
    } catch (error) {
        alert('Failed to submit leave request: ' + error.message);
    }
};

const approveRequest = async (id) => {
    if (confirm('Approve this leave request?')) {
        await leaveStore.updateLeaveStatus(id, 'Approved');
    }
};

const denyRequest = async (id) => {
    if (confirm('Deny this leave request?')) {
        await leaveStore.updateLeaveStatus(id, 'Denied');
    }
};

// Initialize data
onMounted(async () => {
    try {
        employees.value = await employeeService.getAllEmployees();
        await leaveStore.fetchLeaveRequests();
    } catch (error) {
        console.error("Error loading data:", error);
    }
});
</script>

<style scoped>
.leave-container {
    padding-top: 80px;
    padding-bottom: 30px;
}

h1 {
    color: rgb(122, 108, 202);
    font-weight: bold;
}

.card {
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-link {
    cursor: pointer;
}

.table-responsive {
    max-height: 500px;
    overflow-y: auto;
}

@media (max-width: 768px) {
    .leave-container {
        padding-top: 100px;
    }
}
</style>
