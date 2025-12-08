<template>
    <div class="payroll-container">
        <div class="container-fluid">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1>Payroll Management</h1>
                    <p class="text-muted">Process payroll and generate payslips</p>
                </div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#payrollModal">
                    <i class="bi bi-plus-circle"></i> Process Payroll
                </button>
            </div>

            <!-- Payroll Statistics -->
            <div class="row mb-4">
                <div class="col-md-3 mb-3">
                    <div class="card bg-info text-white">
                        <div class="card-body text-center">
                            <h6 class="card-title">Total Payroll</h6>
                            <h2>R{{ totalPayroll.toLocaleString() }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card bg-success text-white">
                        <div class="card-body text-center">
                            <h6 class="card-title">Avg Salary</h6>
                            <h2>R{{ averageSalary.toLocaleString() }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card bg-warning text-white">
                        <div class="card-body text-center">
                            <h6 class="card-title">Total Hours</h6>
                            <h2>{{ totalHours }}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-3">
                    <div class="card bg-danger text-white">
                        <div class="card-body text-center">
                            <h6 class="card-title">Deductions</h6>
                            <h2>{{ totalDeductions }}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Payroll Records Table -->
            <div class="card">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Payroll Records</h5>
                    <button class="btn btn-sm btn-success" @click="generateAllPayslips">
                        Generate All Payslips
                    </button>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th>Employee</th>
                                    <th>Department</th>
                                    <th>Base Salary</th>
                                    <th>Hours Worked</th>
                                    <th>Leave Deductions</th>
                                    <th>Final Salary</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="payroll in payrollRecords" :key="payroll.employeeId">
                                    <td>{{ payroll.employeeName }}</td>
                                    <td>{{ payroll.department }}</td>
                                    <td>R{{ payroll.baseSalary.toLocaleString() }}</td>
                                    <td>{{ payroll.hoursWorked }}h</td>
                                    <td>{{ payroll.leaveDeductions }}h</td>
                                    <td class="fw-bold">R{{ payroll.finalSalary.toLocaleString() }}</td>
                                    <td>
                                        <button 
                                            class="btn btn-sm btn-primary me-2"
                                            @click="viewPayslip(payroll)"
                                            data-bs-toggle="modal" 
                                            data-bs-target="#payslipModal"
                                        >
                                            View Payslip
                                        </button>
                                        <button 
                                            class="btn btn-sm btn-success"
                                            @click="downloadPayslip(payroll)"
                                        >
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Process Payroll Modal -->
        <div class="modal fade" id="payrollModal" tabindex="-1" aria-labelledby="payrollModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="payrollModalLabel">Process Payroll</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form @submit.prevent="processPayroll">
                        <div class="modal-body">
                            <div class="mb-3">
                                <label class="form-label">Employee *</label>
                                <select class="form-select" v-model="selectedEmployeeId" required>
                                    <option value="">-- Choose an Employee --</option>
                                    <option v-for="emp in employees" :key="emp.employeeId" :value="emp.employeeId">
                                        {{ emp.name }}
                                    </option>
                                </select>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Pay Period Start *</label>
                                    <input 
                                        type="date"
                                        class="form-control"
                                        v-model="payPeriod.startDate"
                                        required
                                    />
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label class="form-label">Pay Period End *</label>
                                    <input 
                                        type="date"
                                        class="form-control"
                                        v-model="payPeriod.endDate"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Process Payroll
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Payslip Modal -->
        <div class="modal fade" id="payslipModal" tabindex="-1" aria-labelledby="payslipModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="payslipModalLabel">
                            <i class="bi bi-file-earmark-text"></i> Payslip
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="selectedPayslip">
                        <div class="text-center mb-4">
                            <h3 class="text-primary">ModernTech</h3>
                            <p class="text-muted">Employee Payslip</p>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <p><strong>Employee Name:</strong> {{ selectedPayslip.employeeName }}</p>
                                <p><strong>Employee ID:</strong> {{ selectedPayslip.employeeId }}</p>
                                <p><strong>Department:</strong> {{ selectedPayslip.department }}</p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Position:</strong> {{ selectedPayslip.position }}</p>
                                <p><strong>Pay Period:</strong> {{ currentMonth }}</p>
                                <p><strong>Payment Date:</strong> {{ currentDate }}</p>
                            </div>
                        </div>

                        <hr>

                        <div class="table-responsive">
                            <table class="table">
                                <thead class="table-light">
                                    <tr>
                                        <th>Description</th>
                                        <th class="text-end">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Base Salary</td>
                                        <td class="text-end">R{{ selectedPayslip.baseSalary.toLocaleString() }}</td>
                                    </tr>
                                    <tr>
                                        <td>Hours Worked</td>
                                        <td class="text-end">{{ selectedPayslip.hoursWorked }} hours</td>
                                    </tr>
                                    <tr class="table-warning">
                                        <td>Leave Deductions ({{ selectedPayslip.leaveDeductions }} hours)</td>
                                        <td class="text-end">-R{{ calculateDeductionAmount(selectedPayslip).toLocaleString() }}</td>
                                    </tr>
                                    <tr class="table-success fw-bold">
                                        <td>Net Salary</td>
                                        <td class="text-end">R{{ selectedPayslip.finalSalary.toLocaleString() }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="alert alert-info mt-3">
                            <small><strong>Note:</strong> This is a computer-generated payslip and does not require a signature.</small>
                        </div>
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
import payrollData from '@/data/payroll_data.json';

const employees = ref([]);
const payrollRecords = ref([]);
const selectedEmployeeId = ref('');
const selectedPayslip = ref(null);
const payPeriod = ref({
    startDate: '',
    endDate: ''
});

// Computed properties
const totalPayroll = computed(() => 
    payrollRecords.value.reduce((sum, p) => sum + p.finalSalary, 0)
);

const averageSalary = computed(() => {
    if (payrollRecords.value.length === 0) return 0;
    return Math.round(totalPayroll.value / payrollRecords.value.length);
});

const totalHours = computed(() => 
    payrollRecords.value.reduce((sum, p) => sum + p.hoursWorked, 0)
);

const totalDeductions = computed(() => 
    payrollRecords.value.reduce((sum, p) => sum + p.leaveDeductions, 0)
);

const currentDate = computed(() => {
    return new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
});

const currentMonth = computed(() => {
    return new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long'
    });
});

// Methods
const viewPayslip = (payroll) => {
    selectedPayslip.value = payroll;
};

const calculateDeductionAmount = (payroll) => {
    const hourlyRate = payroll.baseSalary / 160; // Assuming 160 work hours per month
    return Math.round(hourlyRate * payroll.leaveDeductions);
};

const downloadPayslip = (payroll) => {
    alert(`Downloading payslip for ${payroll.employeeName}...`);
};

const printPayslip = () => {
    window.print();
};

const generateAllPayslips = () => {
    alert('Generating payslips for all employees...');
};

const processPayroll = () => {
    alert('Payroll processed successfully!');
    
    // Reset form
    selectedEmployeeId.value = '';
    payPeriod.value = {
        startDate: '',
        endDate: ''
    };
    
    // Close modal
    const modalElement = document.getElementById('payrollModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) modal.hide();
};

// Initialize data
onMounted(() => {
    employees.value = employeeData.employeeInformation;
    
    // Combine employee and payroll data
    payrollRecords.value = payrollData.payrollData.map(pay => {
        const employee = employees.value.find(e => e.employeeId === pay.employeeId);
        return {
            employeeId: pay.employeeId,
            employeeName: employee ? employee.name : 'Unknown',
            department: employee ? employee.department : 'Unknown',
            position: employee ? employee.position : 'Unknown',
            baseSalary: employee ? employee.salary : 0,
            hoursWorked: pay.hoursWorked,
            leaveDeductions: pay.leaveDeductions,
            finalSalary: pay.finalSalary
        };
    });
});
</script>

<style scoped>
.payroll-container {
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
}

.table-responsive {
    max-height: 600px;
    overflow-y: auto;
}

@media (max-width: 768px) {
    .payroll-container {
        padding-top: 100px;
    }
}

@media print {
    .modal-header,
    .modal-footer {
        display: none;
    }
}
</style>