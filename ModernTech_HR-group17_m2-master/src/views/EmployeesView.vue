<template>
    <div class="employees-container">
        <div>
             <!-- Header and loading state -->
             <div v-if="store.isLoading" class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Loading employees...</p>
            </div>
            
            <div v-else>
                <!-- Error message -->
                 <div v-if="store.error" class="alert alert-danger" role="alert">
                    {{ store.error }}
                    <button @click="store.fetchEmployees()" class="btn btn-sm btn-outline-danger ms-3">
                        Retry
                    </button>
                </div>

            <!-- Main Content -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="col-md-12 col-sm-12 mb-12">
                    <div class="card m-1" style="background-color: rgb(122, 108, 202);">
                        <div class="card-body" style="color:white">
                            <h5 class="card-title" style="font-size:xx-large;">
                                Employee Management
                            </h5>
                            <p class="card-subtitle mb-2">
                                Total Employees: {{ store.employeeCount }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <!-- Add Employee Button -->
        <div class="container-fluid">
            <button class="btn btn-dark float-end" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
                <i class="bi bi-plus-circle"></i> Add Employee
            </button>
        </div>


        <!-- Search and Statistics -->
        <div>
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
                        <option v-for="dept in store.uniqueDepartments" :key="dept" :value="dept">
                            {{ dept }}
                        </option>
                    </select>
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
                        <div class="card-header">
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
                                <p>{{ selectedEmployee.employee_id }}</p>
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
                                <p>{{ selectedEmployee.employment_history || 'No employment history available' }}</p>
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
            <div class="modal-header bg-success text-white">
                <h5 class="modal-title" id="addEmployeeModalLabel">
                    <i class="bi bi-person-plus"></i> Add New Employee
                </h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form @submit.prevent="submitNewEmployee" id="addEmployeeForm">
                <div class="modal-body">
                    <div v-if="addEmployeeError" class="alert alert-danger">
                        {{ addEmployeeError }}
                    </div>
                    
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="employee_id" class="form-label">Employee ID *</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="employee_id" 
                                v-model="newEmployee.employee_id"
                                required
                                placeholder="E.g., 15"
                            >
                            <div class="form-text">Unique identifier for the employee</div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="name" class="form-label">Full Name *</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="name" 
                                v-model="newEmployee.name"
                                required
                                placeholder="E.g., John Doe"
                            >
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="position" class="form-label">Position *</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="position" 
                                v-model="newEmployee.position"
                                required
                                placeholder="E.g., Software Engineer"
                            >
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="department" class="form-label">Department *</label>
                            <select 
                                class="form-select" 
                                id="department" 
                                v-model="newEmployee.department"
                                required
                            >
                                <option value="">Select Department</option>
                                <option value="Design">Design</option>
                                <option value="Development">Developement</option>
                                <option value="Finance">Finance</option>
                                <option value="HR">HR</option>
                                <option value="IT">IT</option>
                                <option value="Marketing">Marketing Resources</option>
                                <option value="QA">QA</option>
                                <option value="Sales">Sales</option>
                                <option value="Support">Support</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="salary" class="form-label">Salary *</label>
                            <div class="input-group">
                                <span class="input-group-text">R</span>
                                <input 
                                    type="number" 
                                    class="form-control" 
                                    id="salary" 
                                    v-model="newEmployee.salary"
                                    required
                                    min="0"
                                    step="1000"
                                    placeholder="50000"
                                >
                            </div>
                            <div class="form-text">Annual salary in Rands</div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="contact" class="form-label">Contact Information *</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="contact" 
                                v-model="newEmployee.contact"
                                required
                                placeholder="email@company.com or phone number"
                            >
                            <div class="form-text">Email or phone number</div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="employment_history" class="form-label">Employment History</label>
                            <textarea 
                                class="form-control" 
                                id="employment_history" 
                                v-model="newEmployee.employment_history"
                                rows="3"
                                placeholder="Previous positions, start dates, etc."
                            ></textarea>
                            <div class="form-text">Optional: Brief employment history or notes</div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="resetAddForm">Cancel</button>
                    <button type="submit" class="btn btn-success" :disabled="isAddingEmployee">
                        <span v-if="isAddingEmployee">
                            <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            Adding...
                        </span>
                        <span v-else>
                            <i class="bi bi-check-circle me-1"></i> Add Employee
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
    </div> 
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useEmployeeStore } from '@/stores/employeeStore';

const searchQuery = ref('');
const filterDepartment = ref('');
const selectedEmployee = ref(null);
const store = useEmployeeStore();

const addEmployeeError = ref('');
const isAddingEmployee = ref(false);
const newEmployee = ref({
    employee_id: '',
    name: '',
    position: '',
    department: '',
    salary: '',
    contact: '',
    employment_history: '',
});

// Computed properties
// const departments = computed(() => {
//     const depts = new Set(employees.value.map(e => e.department));
//     return Array.from(depts).sort();
// });

// const averageSalary = computed(() => {
//     if (employees.value.length === 0) return 0;
//     const total = employees.value.reduce((sum, emp) => sum + emp.salary, 0);
//     return Math.round(total / employees.value.length);
// });

// const totalPayroll = computed(() => {
//     return employees.value.reduce((sum, emp) => sum + emp.salary, 0);
// });

const filteredEmployees = computed(() => {
    let filtered = store.employees;
    
    // Filter by search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(emp => 
            emp.name?.toLowerCase().includes(query) ||
            emp.department?.toLowerCase().includes(query) ||
            emp.position?.toLowerCase().includes(query)
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
    store.employees.forEach(emp => {
        if (emp.department) {
            deptMap[emp.department] = (deptMap[emp.department] || 0) + 1;
        }
    });
    
    const total = store.employees.length;
    const colors = ['bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger', 'bg-secondary'];
    
    return Object.entries(deptMap).map(([name, count], index) => ({
        name,
        count,
        percentage: total ? Math.round((count / total) * 100) : 0,
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

const deleteEmployee = async (employeeId, employeeName) => {
    const label = employeeName || employeeId;
    if (!confirm(`Are you sure you want to delete "${label}"?`)) {
        return;
    }
    try {
        await store.deleteEmployee(employeeId);
        alert('Employee deleted successfully!');
    } catch (error) {
        alert('Failed to delete employee: ' + error.message);
    }
};

const resetAddForm = () => {
    newEmployee.value = {
        employee_id: '',
        name: '',
        position: '',
        department: '',
        salary: '',
        contact: '',
        employment_history: '',
    };
    addEmployeeError.value = '';
};

const submitNewEmployee = async () => {
    addEmployeeError.value = '';
    isAddingEmployee.value = true;
    try {
        const payload = {
            ...newEmployee.value,
            salary: Number(newEmployee.value.salary) || 0,
        };
        await store.addEmployee(payload);
        resetAddForm();
    } catch (error) {
        addEmployeeError.value = error.message || 'Failed to add employee.';
    } finally {
        isAddingEmployee.value = false;
    }
};

// Initialize data
onMounted(() => {
    store.fetchEmployees();
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
.card-header{
    background-color: rgb(122, 108, 202);
    color: white;
}
</style>
