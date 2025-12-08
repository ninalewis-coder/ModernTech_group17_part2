<template>
    <div class="payroll-container">
        <div>
            <h1>Payroll Management</h1>
            <p>Process payroll and generate payslips</p>
        </div>
        <button>
            Process Payroll
        </button>

        <!-- Process Payroll Modal -->
        <div class="model-content">
            <div class="modal-header">
                <h5 class="modal-title">Process Payroll</h5>
                <button type="button" class="btn-close"></button>
            </div>
            <form action="">
                <div class="modal-body">
                    <div>
                        <label for="">Employee *</label>
                        <select class="form-select" required>
                            <option value="">-- Choose an Employee --</option>
                            <option value="">[name]</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div>
                        <label class="form-label">Start Date *</label>
                        <input 
                          type="date"
                          class="form-control"
                          required
                          />
                    </div>
                    <div>
                        <label class="form-label">End Date *</label>
                        <input 
                          type="date"
                          class="form-control"
                          required
                          />
                     </div>
                </div>
            </form>
        </div>
        
        <!-- Payroll Records -->

        <!-- Payslip Modal -->



    </div>
</template>

<style scoped>
.payroll-container {
    padding-top: 90px;
}

h1{
    color: rgb(136, 85, 238);
    font-weight: bold;
}
</style>