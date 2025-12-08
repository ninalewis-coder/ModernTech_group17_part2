<template>
    <div class="home-container">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 mb-4">
                    <div class="card welcome-card" style="background-color: rgb(122, 108, 202);">
                        <div class="card-body" style="color:white">
                            <h5 class="card-title" style="font-size:xx-large;">Hello {{ userName }}!</h5>
                            <p class="card-text">Here's what's happening with your team today!</p>
                            <p class="mb-0"><small>{{ currentDate }}</small></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Key Metrics -->
            <div class="row mb-4">
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card metric-card">
                        <div class="card-body text-center">
                            <i class="bi bi-people-fill fs-1 text-primary mb-2"></i>
                            <h5 class="card-title">Total Employees</h5>
                            <p class="card-text fw-bold fs-3">{{ totalEmployees }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card metric-card">
                        <div class="card-body text-center">
                            <i class="bi bi-calendar-check fs-1 text-warning mb-2"></i>
                            <h5 class="card-title">Pending Leave Requests</h5>
                            <p class="card-text fw-bold fs-3">{{ pendingLeaveRequests }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card metric-card">
                        <div class="card-body text-center">
                            <i class="bi bi-cash-stack fs-1 text-success mb-2"></i>
                            <h5 class="card-title">Monthly Payroll</h5>
                            <p class="card-text fw-bold fs-3">R{{ totalPayroll.toLocaleString() }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card metric-card">
                        <div class="card-body text-center">
                            <i class="bi bi-building fs-1 text-info mb-2"></i>
                            <h5 class="card-title">Departments</h5>
                            <p class="card-text fw-bold fs-3">{{ totalDepartments }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="row mb-4">
                <div class="col-lg-6 mb-4">
                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h5 class="mb-0 fw-bold">
                                <i class="bi bi-bar-chart-fill"></i> Employees by Department
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="chart-container">
                                <div v-for="dept in departmentStats" :key="dept.name" class="mb-3">
                                    <div class="d-flex justify-content-between mb-1">
                                        <span>{{ dept.name }}</span>
                                        <span class="fw-bold">{{ dept.count }}</span>
                                    </div>
                                    <div class="progress" style="height: 25px;">
                                        <div 
                                            class="progress-bar" 
                                            :style="{ width: dept.percentage + '%' }"
                                            :class="getDeptColor(dept.name)"
                                        >
                                            {{ dept.percentage }}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 mb-4">
                    <div class="card">
                        <div class="card-header bg-success text-white">
                            <h5 class="mb-0 fw-bold">
                                <i class="bi bi-pie-chart-fill"></i> Leave Request Status
                            </h5>
                        </div>
                        <div class="card-body">
                            <div class="chart-container">
                                <div class="row text-center mb-4">
                                    <div class="col-4">
                                        <div class="stat-box bg-warning-subtle p-3 rounded">
                                            <h3 class="text-warning">{{ leaveStats.pending }}</h3>
                                            <small>Pending</small>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="stat-box bg-success-subtle p-3 rounded">
                                            <h3 class="text-success">{{ leaveStats.approved }}</h3>
                                            <small>Approved</small>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="stat-box bg-danger-subtle p-3 rounded">
                                            <h3 class="text-danger">{{ leaveStats.denied }}</h3>
                                            <small>Denied</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="alert alert-info">
                                    <strong>Total Requests:</strong> {{ leaveStats.total }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Activities -->
            <div class="row">
                <div class="col-lg-6 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0 fw-bold">
                                <i class="bi bi-clock-history"></i> Recent Attendance
                            </h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li v-for="record in recentAttendance" :key="record.id" class="list-group-item">
                                    <div class="d-flex justify-content-between">
                                        <span>{{ record.employeeName }}</span>
                                        <span :class="record.status === 'Present' ? 'badge bg-success' : 'badge bg-danger'">
                                            {{ record.status }}
                                        </span>
                                    </div>
                                    <small class="text-muted">{{ record.date }}</small>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 mb-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0 fw-bold">
                                <i class="bi bi-award"></i> Top Performing Departments
                            </h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-group list-group-flush">
                                <li v-for="(dept, index) in topDepartments" :key="dept.name" class="list-group-item">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div>
                                            <span class="badge bg-primary me-2">{{ index + 1 }}</span>
                                            <strong>{{ dept.name }}</strong>
                                        </div>
                                        <span class="badge bg-success">{{ dept.count }} employees</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import employeeData from '@/data/employee_info.json';
import attendanceData from '@/data/attendance.json';
import payrollData from '@/data/payroll_data.json';

const userName = ref('Admin');
const employees = ref([]);
const attendanceRecords = ref([]);
const leaveRequests = ref([]);

// Computed properties
const currentDate = computed(() => {
    return new Date().toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
});

const totalEmployees = computed(() => employees.value.length);

const totalDepartments = computed(() => {
    const departments = new Set(employees.value.map(e => e.department));
    return departments.size;
});

const totalPayroll = computed(() => {
    return payrollData.payrollData.reduce((sum, p) => sum + p.finalSalary, 0);
});

const pendingLeaveRequests = computed(() => {
    return leaveRequests.value.filter(r => r.status === 'Pending').length;
});

const departmentStats = computed(() => {
    const deptMap = {};
    employees.value.forEach(emp => {
        deptMap[emp.department] = (deptMap[emp.department] || 0) + 1;
    });
    
    const total = employees.value.length;
    return Object.entries(deptMap).map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / total) * 100)
    })).sort((a, b) => b.count - a.count);
});

const leaveStats = computed(() => {
    return {
        pending: leaveRequests.value.filter(r => r.status === 'Pending').length,
        approved: leaveRequests.value.filter(r => r.status === 'Approved').length,
        denied: leaveRequests.value.filter(r => r.status === 'Denied').length,
        total: leaveRequests.value.length
    };
});

const recentAttendance = computed(() => {
    return attendanceRecords.value.slice(0, 5);
});

const topDepartments = computed(() => {
    return departmentStats.value.slice(0, 3);
});

// Methods
const getDeptColor = (deptName) => {
    const colors = ['bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger', 'bg-secondary'];
    const index = departmentStats.value.findIndex(d => d.name === deptName);
    return colors[index % colors.length];
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

// Initialize data
onMounted(() => {
    employees.value = employeeData.employeeInformation;
    
    // Transform attendance data
    let recordId = 1;
    attendanceData.attendanceAndLeave.forEach(empData => {
        empData.attendance.forEach(att => {
            attendanceRecords.value.push({
                id: recordId++,
                employeeId: empData.employeeId,
                employeeName: empData.name,
                date: formatDate(att.date),
                status: att.status
            });
        });
        
        // Transform leave requests
        empData.leaveRequests.forEach(leave => {
            leaveRequests.value.push({
                id: leaveRequests.value.length + 1,
                employeeId: empData.employeeId,
                employeeName: empData.name,
                reason: leave.reason,
                status: leave.status,
                date: leave.date
            });
        });
    });
});
</script>

<style scoped>
.home-container {
    padding-top: 100px;
    padding-bottom: 30px;
}

.welcome-card {
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.metric-card {
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.metric-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.card {
    border-radius: 10px;
}

.card-title {
    color: black;
}

.chart-container {
    min-height: 250px;
}

.progress {
    border-radius: 10px;
}

.stat-box {
    border-radius: 10px;
    transition: transform 0.2s;
}

.stat-box:hover {
    transform: scale(1.05);
}

@media (max-width: 768px) {
    .home-container {
        padding-top: 110px;
    }
}
</style>