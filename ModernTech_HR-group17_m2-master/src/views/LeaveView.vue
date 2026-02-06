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
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#leaveModal">
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
                                            Approve
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
                                <option v-for="emp in employees" :key="emp.employeeId" :value="emp.employeeId">
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
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Start Date *</label>
                                <input 
                                    type="date"
                                    class="form-control"
                                    v-model="newRequest.startDate"
                                    required
                                />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">End Date *</label>
                                <input 
                                    type="date"
                                    class="form-control"
                                    v-model="newRequest.endDate"
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
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import attendanceData from '@/data/attendance.json';
import employeeData from '@/data/employee_info.json';

const employees = ref([]);
const leaveRequests = ref([]);
const activeTab = ref('all');
const newRequest = ref({
    employeeId: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
});

// Computed properties
const pendingCount = computed(() => 
    leaveRequests.value.filter(r => r.status === 'Pending').length
);

const approvedCount = computed(() => 
    leaveRequests.value.filter(r => r.status === 'Approved').length
);

const deniedCount = computed(() => 
    leaveRequests.value.filter(r => r.status === 'Denied').length
);

const filteredLeaveRequests = computed(() => {
    if (activeTab.value === 'all') return leaveRequests.value;
    if (activeTab.value === 'pending') return leaveRequests.value.filter(r => r.status === 'Pending');
    if (activeTab.value === 'approved') return leaveRequests.value.filter(r => r.status === 'Approved');
    if (activeTab.value === 'denied') return leaveRequests.value.filter(r => r.status === 'Denied');
    return leaveRequests.value;
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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const getStatusBadgeClass = (status) => {
    if (status === 'Approved') return 'badge bg-success';
    if (status === 'Denied') return 'badge bg-danger';
    return 'badge bg-warning text-dark';
};

const submitLeaveRequest = () => {
    const employee = employees.value.find(e => e.employeeId === parseInt(newRequest.value.employeeId));
    
    const request = {
        id: leaveRequests.value.length + 1,
        employeeId: newRequest.value.employeeId,
        employeeName: employee.name,
        leaveType: newRequest.value.leaveType,
        startDate: newRequest.value.startDate,
        endDate: newRequest.value.endDate,
        duration: calculateDays.value,
        reason: newRequest.value.reason,
        status: 'Pending'
    };
    
    leaveRequests.value.push(request);
    
    // Reset form
    newRequest.value = {
        employeeId: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: ''
    };
    
    // Close modal (using Bootstrap's modal API)
    const modalElement = document.getElementById('leaveModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
    
    alert('Leave request submitted successfully!');
};

const approveRequest = (id) => {
    const request = leaveRequests.value.find(r => r.id === id);
    if (request) {
        request.status = 'Approved';
        alert('Leave request approved!');
    }
};

const denyRequest = (id) => {
    const request = leaveRequests.value.find(r => r.id === id);
    if (request) {
        request.status = 'Denied';
        alert('Leave request denied!');
    }
};

// Initialize data
onMounted(() => {
    employees.value = employeeData.employeeInformation;
    
    // Transform attendance data into leave requests
    let requestId = 1;
    attendanceData.attendanceAndLeave.forEach(empData => {
        empData.leaveRequests.forEach(leave => {
            leaveRequests.value.push({
                id: requestId++,
                employeeId: empData.employeeId,
                employeeName: empData.name,
                leaveType: leave.reason,
                startDate: leave.date,
                endDate: leave.date,
                duration: 1,
                reason: leave.reason,
                status: leave.status
            });
        });
    });
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