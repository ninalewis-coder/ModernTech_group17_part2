<template>
    <div class="payroll-container">
        <div>
            <div class="col-md-12 col-sm-12 mb-12">
                <div class="card m-1" style="background-color: rgb(122, 108, 202);">
                    <div class="card-body" style="color:white">
                        <h5 class="card-title" style="font-size:xx-large;">
                            Payroll Management
                        </h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <button class="btn btn-dark float-end" data-bs-toggle="modal" data-bs-target="#payrollModal">
                    <i class="bi bi-check-circle me-1"></i> Process Payroll
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
                        <i class="bi bi-check-circle me-1"></i> Generate All Payslips
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
                                            <i class="bi bi-check-circle me-1"></i> Download
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
                                <i class="bi bi-x-circle me-1"></i> Cancel
                            </button>
                            <button type="submit" class="btn btn-success">
                                <i class="bi bi-check-circle me-1"></i> Process Payroll
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
import jsPDF from 'jspdf';

const API_BASE_URL = 'http://localhost:5050';

const employees = ref([]);
const payrollRecords = ref([]);
const selectedEmployeeId = ref('');
const selectedPayslip = ref(null);
const isLoading = ref(false);
const payPeriod = ref({
    startDate: '',
    endDate: ''
});

const totalPayroll = computed(() => {
    if (!payrollRecords.value || payrollRecords.value.length === 0) return 0;
    const total = payrollRecords.value.reduce((sum, p) => {
        const salary = parseFloat(p.finalSalary) || 0;
        return sum + salary;
    }, 0);
    return Math.round(total);
});

const averageSalary = computed(() => {
    if (!payrollRecords.value || payrollRecords.value.length === 0) return 0;
    const avg = totalPayroll.value / payrollRecords.value.length;
    return Math.round(avg);
});

const totalHours = computed(() => {
    if (!payrollRecords.value || payrollRecords.value.length === 0) return 0;
    return payrollRecords.value.reduce((sum, p) => sum + (parseInt(p.hoursWorked) || 0), 0);
});

const totalDeductions = computed(() => {
    if (!payrollRecords.value || payrollRecords.value.length === 0) return 0;
    return payrollRecords.value.reduce((sum, p) => sum + (parseInt(p.leaveDeductions) || 0), 0);
});

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

const viewPayslip = (payroll) => {
    selectedPayslip.value = payroll;
};

const calculateDeductionAmount = (payroll) => {
    const hourlyRate = payroll.baseSalary / 160; // Assuming 160 work hours per month
    return Math.round(hourlyRate * payroll.leaveDeductions);
};

const downloadPayslip = (payroll) => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    
    doc.setTextColor(122, 108, 202);
    doc.text('ModernTech Solutions', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Employee Payslip', 105, 28, { align: 'center' });
    
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 35, 190, 35);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    
    let yPos = 45;
    
    doc.text('Employee Information:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 8;
    doc.text(`Employee Name: ${payroll.employeeName}`, 20, yPos);
    yPos += 6;
    doc.text(`Employee ID: ${payroll.employeeId}`, 20, yPos);
    yPos += 6;
    doc.text(`Department: ${payroll.department}`, 20, yPos);
    yPos += 6;
    doc.text(`Position: ${payroll.position}`, 20, yPos);
    
    yPos = 45;
    doc.setFont('helvetica', 'bold');
    doc.text('Payment Details:', 120, yPos);
    doc.setFont('helvetica', 'normal');
    yPos += 8;
    doc.text(`Pay Period: ${currentMonth.value}`, 120, yPos);
    yPos += 6;
    doc.text(`Payment Date: ${currentDate.value}`, 120, yPos);
    
    yPos = 85;
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPos, 190, yPos);
    
    yPos += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Salary Breakdown', 20, yPos);

    yPos += 10;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos - 5, 170, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Description', 25, yPos);
    doc.text('Amount', 160, yPos);
    
    doc.setFont('helvetica', 'normal');
    yPos += 10;
    doc.text('Base Salary', 25, yPos);
    doc.text(`R ${payroll.baseSalary.toLocaleString()}`, 160, yPos);
    
    yPos += 8;
    doc.text(`Hours Worked (${payroll.hoursWorked} hours)`, 25, yPos);
    doc.text('-', 160, yPos);
    
    yPos += 8;
    const deductionAmount = calculateDeductionAmount(payroll);
    doc.setTextColor(200, 100, 0);
    doc.text(`Leave Deductions (${payroll.leaveDeductions} hours)`, 25, yPos);
    doc.text(`-R ${deductionAmount.toLocaleString()}`, 160, yPos);
    
    yPos += 10;
    doc.setDrawColor(0, 150, 0);
    doc.setLineWidth(0.5);
    doc.line(20, yPos - 2, 190, yPos - 2);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(0, 150, 0);
    doc.text('Net Salary', 25, yPos + 3);
    doc.text(`R ${payroll.finalSalary.toLocaleString()}`, 160, yPos + 3);
    
    yPos += 20;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.setFont('helvetica', 'italic');
    doc.text('Note: This is a computer-generated payslip and does not require a signature.', 105, yPos, { align: 'center' });
    
    yPos += 10;
    doc.text(`Generated on ${new Date().toLocaleString()}`, 105, yPos, { align: 'center' });
    
    doc.save(`Payslip_${payroll.employeeName.replace(/\s+/g, '_')}_${currentMonth.value.replace(/\s+/g, '_')}.pdf`);
};

const printPayslip = () => {
    window.print();
};

const generateAllPayslips = () => {
    alert('Generating payslips for all employees...');
};

const loadPayrollData = async () => {
    try {
        isLoading.value = true;
        const response = await fetch(`${API_BASE_URL}/payroll`);
        if (!response.ok) {
            throw new Error('Failed to fetch payroll data');
        }
        const payrollDataFromAPI = await response.json();
        
        payrollRecords.value = payrollDataFromAPI.map(pay => {
            const employee = employees.value.find(e => e.employeeId === pay.employee_id);
            return {
                payroll_id: pay.payroll_id,
                employeeId: pay.employee_id,
                employeeName: employee ? employee.name : 'Unknown',
                department: employee ? employee.department : 'Unknown',
                position: employee ? employee.position : 'Unknown',
                baseSalary: employee ? employee.salary : 0,
                hoursWorked: pay.hours_worked,
                leaveDeductions: pay.leave_deductions,
                finalSalary: pay.final_salary
            };
        });
    } catch (error) {
        console.error('Failed to load payroll data:', error);
        alert('Error loading payroll data: ' + error.message);
    } finally {
        isLoading.value = false;
    }
};

const processPayroll = async () => {
    try {
        if (!selectedEmployeeId.value) {
            alert('Please select an employee');
            return;
        }

        const employee = employees.value.find(e => e.employeeId === selectedEmployeeId.value);
        if (!employee) {
            alert('Employee not found');
            return;
        }

        isLoading.value = true;
        
        const payrollPayload = {
            employee_id: parseInt(selectedEmployeeId.value),
            hours_worked: 160,
            leave_deductions: 0,
            final_salary: employee.salary
        };

        const response = await fetch(`${API_BASE_URL}/payroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payrollPayload)
        });

        if (!response.ok) {
            throw new Error('Failed to process payroll');
        }

        await loadPayrollData();
        
        alert('Payroll processed successfully!');
        
        selectedEmployeeId.value = '';
        payPeriod.value = {
            startDate: '',
            endDate: ''
        };
        
        const modalElement = document.getElementById('payrollModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    } catch (error) {
        console.error('Error processing payroll:', error);
        alert('Failed to process payroll: ' + error.message);
    } finally {
        isLoading.value = false;
    }
};

onMounted(async () => {
    try {
        console.log('PayrollView mounted - loading data...');
        employees.value = employeeData.employeeInformation;
        console.log(`Loaded ${employees.value.length} employees`);
        
        isLoading.value = true;
        console.log('Fetching payroll data from backend...');
        
        const response = await fetch(`${API_BASE_URL}/payroll`);
        console.log(`Response status: ${response.status}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const payrollDataFromAPI = await response.json();
        console.log('Data received from backend:', payrollDataFromAPI);
        
        payrollRecords.value = payrollDataFromAPI.map(pay => {
            const employee = employees.value.find(e => e.employeeId === pay.employee_id);
            return {
                payroll_id: pay.payroll_id,
                employeeId: pay.employee_id,
                employeeName: employee ? employee.name : 'Unknown',
                department: employee ? employee.department : 'Unknown',
                position: employee ? employee.position : 'Unknown',
                baseSalary: employee ? employee.salary : 0,
                hoursWorked: pay.hours_worked,
                leaveDeductions: pay.leave_deductions,
                finalSalary: pay.final_salary
            };
        });
        
        console.log(`Successfully loaded ${payrollRecords.value.length} payroll records`);
        isLoading.value = false;
    } catch (error) {
        console.error('Error during initialization:', error);
        isLoading.value = false;
        alert('Failed to load payroll data:\n' + error.message + '\n\nMake sure:\n1. Backend is running on http://localhost:5050\n2. MySQL database is running\n3. "modern_solutions" database exists with "payroll" table');
    }
});
</script>

<style scoped>
.payroll-container {
    padding-top: 80px;
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
