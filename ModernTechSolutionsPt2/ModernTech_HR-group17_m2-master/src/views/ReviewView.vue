<template>
    <div class="review-container">
        <div class="container-fluid">
            <div class="mb-4">
                <h1>Performance Reviews</h1>
                <p class="text-muted">Submit and view employee performance reviews</p>
            </div>

            <!-- Submit Review Form -->
            <div class="card mb-4">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0"><i class="bi bi-pencil-square"></i> Submit New Review</h5>
                </div>
                <div class="card-body">
                    <form @submit.prevent="submitReview">
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label class="form-label">Employee *</label>
                                <select class="form-select" v-model="newReview.employeeId" required>
                                    <option value="">-- Select Employee --</option>
                                    <option v-for="emp in employees" :key="emp.employeeId" :value="emp.employeeId">
                                        {{ emp.name }} - {{ emp.position }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Review Period *</label>
                                <input type="month" class="form-control" v-model="newReview.period" required />
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Review *</label>
                            <textarea 
                                class="form-control" 
                                rows="6" 
                                v-model="newReview.review"
                                placeholder="Write your review here..."
                                required
                            ></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-circle"></i> Submit Review
                        </button>
                        <button type="button" class="btn btn-secondary ms-2" @click="resetForm">
                            <i class="bi bi-x-circle"></i> Clear Form
                        </button>
                    </form>
                </div>
            </div>

            <!-- Past Reviews Table -->
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0"><i class="bi bi-clock-history"></i> Past Reviews</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <th>Date</th>
                                    <th>Employee</th>
                                    <th>Department</th>
                                    <th>Period</th>
                                    <th>Review</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="review in sortedReviews" :key="review.id">
                                    <td>{{ formatDate(review.reviewDate) }}</td>
                                    <td>{{ review.employeeName }}</td>
                                    <td>
                                        <span class="badge bg-secondary">{{ review.department }}</span>
                                    </td>
                                    <td>{{ review.period }}</td>
                                    <td>{{ truncateText(review.review, 50) }}</td>
                                    <td>
                                        <button 
                                            class="btn btn-sm btn-outline-primary"
                                            @click="viewReview(review)"
                                            data-bs-toggle="modal" 
                                            data-bs-target="#reviewModal"
                                        >
                                            <i class="bi bi-eye"></i> View
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- View Review Modal -->
        <div class="modal fade" id="reviewModal" tabindex="-1" aria-labelledby="reviewModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="reviewModalLabel">
                            <i class="bi bi-file-earmark-text"></i> Performance Review
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="selectedReview">
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Employee:</label>
                                <p>{{ selectedReview.employeeName }}</p>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Department:</label>
                                <p><span class="badge bg-secondary">{{ selectedReview.department }}</span></p>
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Review Date:</label>
                                <p>{{ formatDate(selectedReview.reviewDate) }}</p>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold">Review Period:</label>
                                <p>{{ selectedReview.period }}</p>
                            </div>
                        </div>

                        <hr>

                        <div class="mb-3">
                            <label class="form-label fw-bold">Review:</label>
                            <p class="text-muted" style="white-space: pre-wrap;">{{ selectedReview.review }}</p>
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

const employees = ref([]);
const reviews = ref([]);
const selectedReview = ref(null);
const newReview = ref({
    employeeId: '',
    period: '',
    review: ''
});

// Computed properties
const thisMonthReviews = computed(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    return reviews.value.filter(r => r.period === currentMonth).length;
});

const uniqueEmployees = computed(() => {
    const employeeIds = new Set(reviews.value.map(r => r.employeeId));
    return employeeIds.size;
});

const sortedReviews = computed(() => {
    return [...reviews.value].sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
});

// Methods
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

const viewReview = (review) => {
    selectedReview.value = review;
};

const submitReview = () => {
    const employee = employees.value.find(e => e.employeeId === parseInt(newReview.value.employeeId));
    
    const review = {
        id: reviews.value.length + 1,
        employeeId: newReview.value.employeeId,
        employeeName: employee.name,
        department: employee.department,
        period: newReview.value.period,
        review: newReview.value.review,
        reviewDate: new Date().toISOString()
    };
    
    reviews.value.push(review);
    alert('Review submitted successfully!');
    resetForm();
};

const resetForm = () => {
    newReview.value = {
        employeeId: '',
        period: '',
        review: ''
    };
};

// Initialize data
onMounted(() => {
    employees.value = employeeData.employeeInformation;
    
    // Add some sample reviews
    reviews.value = [
        {
            id: 1,
            employeeId: 1,
            employeeName: 'Sibongile Nkosi',
            department: 'Development',
            period: '2025-11',
            review: 'Wow, Sibongile Nkosi is amazing!',
            reviewDate: '2025-11-30T10:00:00'
        },
        {
            id: 2,
            employeeId: 2,
            employeeName: 'Lungile Moyo',
            department: 'HR',
            period: '2025-11',
            review: 'Lungile, What a lad!',
            reviewDate: '2025-11-28T14:30:00'
        },
        {
            id: 3,
            employeeId: 3,
            employeeName: 'Thabo Molefe',
            department: 'QA',
            period: '2025-11',
            review: 'Who is Thabo? I have never heard of him.',
            reviewDate: '2025-11-25T11:15:00'
        }
    ];
});
</script>

<style scoped>
.review-container {
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

@media (max-width: 768px) {
    .review-container {
        padding-top: 100px;
    }
}
</style>
