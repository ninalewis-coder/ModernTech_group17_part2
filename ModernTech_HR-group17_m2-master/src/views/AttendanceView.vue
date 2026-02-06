<template>
    <div class="attendance-container">
        <div>
            <div class="col-md-12 col-sm-12 mb-12">
                <div class="card m-1" style="background-color: rgb(122, 108, 202);">
                    <div class="card-body" style="color:white">
                        <h5 class="card-title" style="font-size:xx-large;">
                                Attendance Management
                        </h5>
                    </div>
                </div>
            </div>
        </div>        
        <div class="container-fluid">
            <div class="filter">
            <!-- Search and Filter -->
            <div class="row mb-4">
                <div class="col-md-4 mb-3">
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Search employee..."
                        v-model="searchQuery"
                    />
                </div>
                <div class="col-md-4 mb-3">
                    <select class="form-select" v-model="selectedEmployee">
                       <option value="">All Employees</option>
                       <option v-for="emp in employees" :key="emp.employeeId" :value="emp.employeeId">
                           {{ emp.name }}
                       </option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <input type="date" class="form-control" v-model="selectedDate" />
                </div>
            </div>
            </div>

            <!-- Attendance Records Table -->
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">Attendance Records</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="record in filteredAttendanceRecords" :key="record.id">
                                    <td>{{ record.employeeName }}</td>
                                    <td>{{ formatDate(record.date) }}</td>
                                    <td>
                                        <span :class="getStatusBadgeClass(record.status)">
                                            {{ record.status }}
                                        </span>
                                    </td>
                                    <td>{{ record.department }}</td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-2" @click="editAttendance(record)">
                                            Edit
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger" @click="deleteAttendance(record.id)">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Statistics -->
          <div class="statistics">
            <div class="row mt-4">
                <div class="col-md-4 col-sm-6 mb-3">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">Total Employees</h5>
                            <p class="card-text fw-bold fs-3">{{ employees.length }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 mb-3">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">Attendance Rate</h5>
                            <p class="card-text fw-bold fs-3">{{ attendanceRate }}%</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-sm-6 mb-3">
                    <div class="card">
                        <div class="card-body text-center">
                            <h5 class="card-title">Active Departments</h5>
                            <p class="card-text fw-bold fs-3">{{ uniqueDepartments }}</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div> 
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import attendanceData from '@/data/attendance.json';
import employeeData from '@/data/employee_info.json';

const employees = ref([]);
const attendanceRecords = ref([]);
const searchQuery = ref('');
const selectedEmployee = ref('');
const selectedDate = ref('');

// Computed statistics
const attendanceStats = computed(() => {
    const allRecords = attendanceRecords.value;
    return {
        totalDays: allRecords.length,
        present: allRecords.filter(r => r.status === 'Present').length,
        absent: allRecords.filter(r => r.status === 'Absent').length
    };
});

const attendanceRate = computed(() => {
    if (attendanceStats.value.totalDays === 0) return 0;
    return Math.round((attendanceStats.value.present / attendanceStats.value.totalDays) * 100);
});

const uniqueDepartments = computed(() => {
    const departments = new Set(employees.value.map(e => e.department));
    return departments.size;
});

const filteredAttendanceRecords = computed(() => {
    let records = attendanceRecords.value;
    
    if (searchQuery.value) {
        records = records.filter(r => 
            r.employeeName.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }
    
    if (selectedEmployee.value) {
        records = records.filter(r => r.employeeId === selectedEmployee.value);
    }
    
    if (selectedDate.value) {
        records = records.filter(r => r.date === selectedDate.value);
    }
    
    return records;
});

// Methods
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const getStatusBadgeClass = (status) => {
    return status === 'Present' 
        ? 'badge bg-success' 
        : 'badge bg-danger';
};

const editAttendance = (record) => {
    alert(`Edit attendance for ${record.employeeName} on ${formatDate(record.date)}`);
};

const deleteAttendance = (id) => {
    if (confirm('Are you sure you want to delete this attendance record?')) {
        attendanceRecords.value = attendanceRecords.value.filter(r => r.id !== id);
    }
};

// Initialize data
onMounted(() => {
    employees.value = employeeData.employeeInformation;
    
    // Transform attendance data into flat records
    let recordId = 1;
    attendanceData.attendanceAndLeave.forEach(empData => {
        const employee = employees.value.find(e => e.employeeId === empData.employeeId);
        empData.attendance.forEach(att => {
            attendanceRecords.value.push({
                id: recordId++,
                employeeId: empData.employeeId,
                employeeName: empData.name,
                date: att.date,
                status: att.status,
                department: employee ? employee.department : 'Unknown'
            });
        });
    });
});
</script>

<style scoped>
.attendance-container {
    padding-top: 90px;
    padding-bottom: 30px;
}

.filter {
    padding-top: 15px;

}

.card-header {
    background-color: rgb(122, 108, 202);
    color: white;
    font-weight: bold;
}

.card {
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.table-responsive {
    max-height: 500px;
    overflow-y: auto;
}

@media (max-width: 768px) {
    .attendance-container {
        padding-top: 100px;
    }
}

.statistics .card {
    background-color: rgba(0, 0, 0, 0.871);
    color: white;
}
 
</style>