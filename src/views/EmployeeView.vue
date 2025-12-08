<template>
    <div class="employees-container">
        <div>
            <div>
                <h1>Attendance Management</h1>
                <p>Track employee attendance and generate reports</p>
            </div>

            <!-- Search and Filter -->
            <div>
                <div>
                  <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Search.."
                <div>
                    <h6>Total Days</h6>
                    <h2>{{ employeeStats.total }}</h2>
                </div>
            </div>
            <div>
                <h6>Present</h6>
                <h2>{{ employeeStats.present}}</h2>
            </div>
            <div>
                <h6>Absent</h6>
                <h2>{{ employeeStats.absent}}</h2>
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
                            <td>{{ employee.name }}</td>
                            <td>{{ employee.email }}</td>
                            <td>{{ employee.department }}</td>
                            <td>{{ employee.position }}</td>
                            <td>{{ employee.salary }}</td>
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
            <div>
                <div class="card-body">
                    <h6>Total Present</h6>
                    <h2>{{ companyStats.totalPresent }}</h2>
                </div>
                <div class="card-body">
                    <h6>Total Absent</h6>
                    <h2>{{ companyStats.totalAbsent }}</h2>
                </div>
                <div class="card-body">
                    <h6>On Leave</h6>
                    <h2>{{ companyStats.totalLeave }}</h2>
                </div>
            </div> 
        </div>
    </div> 
</template>

<style scoped>
.employees-container {
    padding-top: 90px;
}

h1{
    color: rgb(136, 85, 238);
    font-weight: bold;
}
</style>