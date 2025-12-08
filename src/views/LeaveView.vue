<template>
    <div class="leave-container">
        <div>
            <div>
                <h1>Leave Management</h1>
                <p>Request and manage time-off and leave</p>
            </div>

            <button class="btn">
                Request Leave
            </button>
        </div>
    </div>

    <!-- Request Leave Modal -->
    <div class="model-content">
       <div>
            <div class="modal-header">
                <h5 class="modal-title">Submit Leave Request</h5>
                <button type="button" class="btn-close"></button>
            </div>
            <form action="">
                <div class="modal-body">
                    <div>
                        <label for="">Employee *</label>
                        <select class="form-select" required>
                            <option value="">-- Choose an Employee --</option>
                            <option value="">emp.name</option>
                        </select>
                    </div>
                    <div>
                        <label for="">Type of Leave *</label>
                        <select class="form-select" required>
                            <option value="">-- Select Type --</option>
                            <option value="Personal Leave">Personal Leave</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Maternity Leave">Maternity Leave</option>
                            <option value="Other">Other</option>
                        </select>
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

                    <div>
                        <label class="form-label">Reason *</label>
                        <textarea class="form-control" required></textarea>
                    </div>

                    <div class="alert">
                        Duration: calculateDays() day(s)
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button">
                        Cancel
                    </button>
                    <button type="button">
                        Submit Request
                    </button>
                </div>
            </form>
        </div>    
    </div>
    <!-- Tabs for Different Views -->

    <!-- Request Statistics -->
    <div>
        <div class="card-body">
            <h6>Rending Requests</h6>
            <h2>pendingCount</h2>
        </div>
        <div class="card-body">
            <h6>Approved Requests</h6>
            <h2>aprrovedCount</h2>
        </div>
        <div class="card-body">
            <h6>Rejected Requests</h6>
            <h2>rejectedCount</h2>
        </div>
    </div>

    <div class="card text-center">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" aria-current="true" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
</template>

<style scoped>
.leave-container {
    padding-top: 90px;
}

h1{
    color: rgb(136, 85, 238);
    font-weight: bold;
}
</style>