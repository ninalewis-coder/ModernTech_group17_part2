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
                       <option v-for="emp in employees" :key="emp.employee_id" :value="emp.employee_id">
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
                                <tr v-for="record in filteredAttendanceRecords" :key="record.attendance_id">
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
                                            Toggle Status
                                        </button>
                                        <button class="btn btn-sm btn-outline-danger" @click="deleteAttendance(record.attendance_id)">
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
import { useAttendanceStore } from '@/stores/attendanceStore';
import { employeeService } from '@/api/employeeService'; // Assuming this exists or using store if created
// If employeeService doesn't exist yet as a store, we use the service directly.
// The plan mentioned using employeeService. 

const attendanceStore = useAttendanceStore();
const employees = ref([]);
const searchQuery = ref('');
const selectedEmployee = ref('');
const selectedDate = ref('');

// Computed statistics
const attendanceStats = computed(() => {
    const allRecords = attendanceStore.attendanceRecords;
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
    // We need employee details for department. 
    // If attendance record has employee_id, we look up in employees array.
    const depts = new Set();
    attendanceStore.attendanceRecords.forEach(r => {
        const emp = employees.value.find(e => e.employee_id === r.employee_id);
        if (emp && emp.department) {
            depts.add(emp.department);
        }
    });
    return depts.size;
});

const filteredAttendanceRecords = computed(() => {
    let records = attendanceStore.attendanceRecords.map(r => {
        const emp = employees.value.find(e => e.employee_id === r.employee_id);
        return {
            ...r,
            employeeName: emp ? emp.name : 'Unknown', // Helper for display
            department: emp ? emp.department : 'Unknown'
        };
    });
    
    if (searchQuery.value) {
        records = records.filter(r => 
            r.employeeName.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }
    
    if (selectedEmployee.value) {
        records = records.filter(r => r.employee_id === selectedEmployee.value);
    }
    
    if (selectedDate.value) {
        // Ensure date format matches. Backend sends ISO string or date string.
        // We'll normalize to YYYY-MM-DD for comparison if needed, 
        // but simplest is if input date matches format.
        // Let's assume strict match or substring match for now.
        records = records.filter(r => r.date.startsWith(selectedDate.value));
    }
    
    return records;
});

// Methods
const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const getStatusBadgeClass = (status) => {
    return status === 'Present' 
        ? 'badge bg-success' 
        : 'badge bg-danger';
};

const editAttendance = async (record) => {
    // Simple toggle for now as per previous logic, or prompt
    const newStatus = record.status === 'Present' ? 'Absent' : 'Present';
    if (confirm(`Change status for ${record.employeeName} to ${newStatus}?`)) {
        await attendanceStore.updateAttendance(record.attendance_id, newStatus);
    }
};

const deleteAttendance = async (id) => {
    if (confirm('Are you sure you want to delete this attendance record?')) {
        await attendanceStore.deleteAttendance(id);
    }
};

// Initialize data
onMounted(async () => {
    try {
        // Fetch employees first to populate names
        employees.value = await employeeService.getAllEmployees(); 
        await attendanceStore.fetchAttendance();
    } catch (error) {
        console.error("Error loading data:", error);
    }
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