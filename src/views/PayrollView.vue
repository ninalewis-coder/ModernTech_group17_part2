<template>
    <div class="payroll-container">
        <div class="col-md-12 col-sm-12 mb-12">
                <div class="card m-1" style="background-color: rgb(122, 108, 202);">
                    <div class="card-body" style="color:white">
                        <h5 class="card-title" style="font-size:xx-large;">
                            Payroll Management
                        </h5>
                    </div>
                </div>
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
    padding-top: 80px;
}

h1{
    color: rgb(136, 85, 238);
    font-weight: bold;
}
</style>