<template>
    <div class="employees-container">
        <div class="container-fluid">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1>Employees Management</h1>
                    <p class="text-muted">Manage employee information and records</p>
                </div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
                    <i class="bi bi-plus-circle"></i> Add Employee
                </button>
            </div>

            <!-- Search and Statistics -->
            <div class="row mb-4">
                <div class="col-md-6 mb-3">
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Search by name, department, or position..."
                        v-model="searchQuery"
                    />
                </div>
                <div class="col-md-6 mb-3">
                    <select class="form-select" v-model="filterDepartment">
                        <option value="">All Departments</option>
                        <option v-for="dept in departments" :key="dept" :value="dept">
                            {{ dept }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Statistics Cards -->
            <div class="row mb-4">
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card bg-primary text-white">
                        <div class="card-body text-center">
                            <h6 class="card-title">Total Employees</h6>
                            <h2>{{ employees.length }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card bg-success text-white">
                        <div class="card-body text-center">
                            <h6 class="card-title">Departments</h6>
                            <h2>{{ departments.length }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card bg-info text-white">
                        <div class="card-body text-center">
                            <h6 class="card-title">Average Salary</h6>
                            <h2>R{{ averageSalary.toLocaleString() }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card bg-warning text-white">
                        <div class="card-body text-center">
                            <h6 class="card-title">Total Payroll</h6>
                            <h2>R{{ totalPayroll.toLocaleString() }}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Employees Table -->
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">Employee Directory</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Department</th>
                                    <th>Contact</th>
                                    <th>Salary</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="employee in filteredEmployees" :key="employee.employeeId">
                                    <td>{{ employee.employeeId }}</td>
                                    <td>{{ employee.name }}</td>
                                    <td>{{ employee.position }}</td>
                                    <td>
                                        <span class="badge bg-secondary">{{ employee.department }}</span>
                                    </td>
                                    <td>{{ employee.contact }}</td>
                                    <td class="fw-bold">R{{ employee.salary.toLocaleString() }}</td>
                                    <td>
                                        <button 
                                            class="btn btn-sm btn-outline-primary me-1"
                                            @click="viewEmployee(employee)"
                                            data-bs-toggle="modal" 
                                            data-bs-target="#viewEmployeeModal"
                                        >
                                            <i class="bi bi-eye"></i>
                                        </button>
                                        <button 
                                            class="btn btn-sm btn-outline-success me-1"
                                            @click="editEmployee(employee)"
                                        >
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button 
                                            class="btn btn-sm btn-outline-danger"
                                            @click="deleteEmployee(employee.employeeId)"
                                        >
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Department Breakdown -->
            <div class="row mt-4">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h5 class="mb-0"><i class="bi bi-bar-chart-fill"></i> Department Breakdown</h5>
                        </div>
                        <div class="card-body">
                            <div v-for="dept in departmentStats" :key="dept.name" class="mb-3">
                                <div class="d-flex justify-content-between mb-1">
                                    <span><strong>{{ dept.name }}</strong></span>
                                    <span>{{ dept.count }} employees ({{ dept.percentage }}%)</span>
                                </div>
                                <div class="progress" style="height: 25px;">
                                    <div 
                                        class="progress-bar" 
                                        :class="dept.color"
                                        :style="{ width: dept.percentage + '%' }"
                                    >
                                        {{ dept.percentage }}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- View Employee Modal -->
        <div class="modal fade" id="viewEmployeeModal" tabindex="-1" aria-labelledby="viewEmployeeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="viewEmployeeModalLabel">
                            <i class="bi bi-person-badge"></i> Employee Details
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="selectedEmployee">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Employee ID:</label>
                                <p>{{ selectedEmployee.employeeId }}</p>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Name:</label>
                                <p>{{ selectedEmployee.name }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Position:</label>
                                <p>{{ selectedEmployee.position }}</p>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Department:</label>
                                <p><span class="badge bg-secondary">{{ selectedEmployee.department }}</span></p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Contact:</label>
                                <p>{{ selectedEmployee.contact }}</p>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label fw-bold">Salary:</label>
                                <p class="text-success fw-bold">R{{ selectedEmployee.salary.toLocaleString() }}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 mb-3">
                                <label class="form-label fw-bold">Employment History:</label>
                                <p>{{ selectedEmployee.employmentHistory }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Employee Modal -->
        <div class="modal fade" id="addEmployeeModal" tabindex="-1" aria-labelledby="addEmployeeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addEmployeeModalLabel">Add New Employee</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p class="text-muted">This is a demo feature. In a production system, this would add a new employee to the database.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import employeeData from '@/data/employee_info.json';

const employees = ref([]);
const searchQuery = ref('');
const filterDepartment = ref('');
const selectedEmployee = ref(null);

// Computed properties
const departments = computed(() => {
    const depts = new Set(employees.value.map(e => e.department));
    return Array.from(depts).sort();
});

const averageSalary = computed(() => {
    if (employees.value.length === 0) return 0;
    const total = employees.value.reduce((sum, emp) => sum + emp.salary, 0);
    return Math.round(total / employees.value.length);
});

const totalPayroll = computed(() => {
    return employees.value.reduce((sum, emp) => sum + emp.salary, 0);
});

const filteredEmployees = computed(() => {
    let filtered = employees.value;
    
    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(emp => 
            emp.name.toLowerCase().includes(query) ||
            emp.department.toLowerCase().includes(query) ||
            emp.position.toLowerCase().includes(query)
        );
    }
    
    // Filter by department
    if (filterDepartment.value) {
        filtered = filtered.filter(emp => emp.department === filterDepartment.value);
    }
    
    return filtered;
});

const departmentStats = computed(() => {
    const deptMap = {};
    employees.value.forEach(emp => {
        deptMap[emp.department] = (deptMap[emp.department] || 0) + 1;
    });
    
    const total = employees.value.length;
    const colors = ['bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger', 'bg-secondary'];
    
    return Object.entries(deptMap).map(([name, count], index) => ({
        name,
        count,
        percentage: Math.round((count / total) * 100),
        color: colors[index % colors.length]
    })).sort((a, b) => b.count - a.count);
});

// Methods
const viewEmployee = (employee) => {
    selectedEmployee.value = employee;
};

const editEmployee = (employee) => {
    alert(`Edit employee: ${employee.name}\n(This is a demo feature)`);
};

const deleteEmployee = (employeeId) => {
    if (confirm('Are you sure you want to delete this employee?')) {
        employees.value = employees.value.filter(emp => emp.employeeId !== employeeId);
        alert('Employee deleted successfully!');
    }
};

// Initialize data
onMounted(() => {
    employees.value = employeeData.employeeInformation;
});
</script>

<style scoped>
.employees-container {
    padding-top: 90px;
    padding-bottom: 30px;
}

h1 {
    color: rgb(136, 85, 238);
    font-weight: bold;
}

.card {
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.table-responsive {
    max-height: 600px;
    overflow-y: auto;
}

.progress {
    border-radius: 10px;
}

@media (max-width: 768px) {
    .employees-container {
        padding-top: 100px;
    }
}
</style>