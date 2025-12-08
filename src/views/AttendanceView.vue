<template>
    <div class="attendance-container">
        <div>
            <div>
                <h1>Attendance Management</h1>
                <p>Track employee attendance and generate reports</p>
            </div>

            <!-- Search and Filter -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <select class="form-select" aria-label="Default select example">
                       <option selected>Open this select menu</option>
                       <option value="1">One</option>
                       <option value="2">Two</option>
                       <option value="3">Three</option>
                    </select>
                </div>

                <div class="col-md-6 mb-3">
                    <select name="" type="date"></select>
                </div>

                <div>

                </div>
            </div>
            <!-- Attendance Summary Cards -->
             <div>
                <div>
                    <h6>Total Days</h6>
                    <h2>[employeeStats.total]</h2>
                </div>
            </div>
            <div>
                <h6>Present</h6>
                <h2>[employeeStats.present]</h2>
            </div>
            <div>
                <h6>Absent</h6>
                <h2>[employeeStats.absent]</h2>
            </div>

            <!-- Attendance Records Table -->
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Position</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>[employee.name]</td>
                            <td>[employee.email]</td>
                            <td>[employee.department]</td>
                            <td>[employee.position]</td>
                            <td>[employee.salary]</td>
                            <td>
                                <button>
                                    Edit
                                </button>
                                <button>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Statistics -->
            <div class="row mt-4">
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Total Employees</h5>
                            <p class="card-text fw-bold">{{ 9 }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Pending Leave Requests</h5>
                            <p class="card-text">{{ 9 }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Pending Payroll</h5>
                            <p class="card-text">{{ 9 }}.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Departments</h5>
                            <p class="card-text">{{ 9 }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<script setup>
</script>

<style scoped>
.attendance-container {
    padding-top: 80px;
}

h1{
    color: rgb(122, 108, 202);
    margin: 20px;
    font-weight: bold;
}
</style>