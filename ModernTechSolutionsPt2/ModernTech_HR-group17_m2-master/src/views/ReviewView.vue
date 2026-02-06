<template>
    <div class="review-container">
        <div>
            <div class="col-md-12 col-sm-12 mb-12">
                <div class="card m-1" style="background-color: rgb(122, 108, 202);">
                    <div class="card-body" style="color:white">
                        <h5 class="card-title" style="font-size:xx-large;">
                            Performance Review
                        </h5>
                    </div>
                </div>
            </div>
    

            <!-- Submit Review Form -->
            <div class="card mb-4">
                <div class="card-header bg-dark text-white">
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

                        <div class="d-flex justify-content-end gap-2">
                            <button type="button" class="btn btn-secondary" @click="resetForm">
                                <i class="bi bi-x-circle"></i> Clear Form
                            </button>
                            <button type="submit" class="btn btn-success">
                                <i class="bi bi-check-circle me-1"></i> Submit Review
                            </button>
                        </div>
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

const API_BASE_URL = 'http://localhost:5050';

const employees = ref([]);
const reviews = ref([]);
const selectedReview = ref(null);
const isLoading = ref(false);
const newReview = ref({
    employeeId: '',
    period: '',
    review: ''
});

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

const submitReview = async () => {
    try {
        if (!newReview.value.employeeId || !newReview.value.period || !newReview.value.review) {
            alert('Please fill in all fields');
            return;
        }

        const employee = employees.value.find(e => e.employeeId === parseInt(newReview.value.employeeId));
        
        if (!employee) {
            alert('Employee not found');
            return;
        }

        isLoading.value = true;

        const reviewPayload = {
            employee_id: parseInt(newReview.value.employeeId),
            review_period: newReview.value.period,
            review: newReview.value.review,
            review_date: new Date().toISOString()
        };

        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewPayload)
        });

        if (!response.ok) {
            throw new Error('Failed to submit review');
        }

        await loadReviewData();
        
        alert('Review submitted successfully!');
        resetForm();
    } catch (error) {
        console.error('Error submitting review:', error);
        alert('Failed to submit review: ' + error.message);
    } finally {
        isLoading.value = false;
    }
};

const resetForm = () => {
    newReview.value = {
        employeeId: '',
        period: '',
        review: ''
    };
};

const loadReviewData = async () => {
    try {
        isLoading.value = true;
        console.log('Fetching reviews from backend...');
        
        const response = await fetch(`${API_BASE_URL}/reviews`);
        console.log(`Response status: ${response.status}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const reviewsFromAPI = await response.json();
        console.log('Reviews received:', reviewsFromAPI);
        
        reviews.value = reviewsFromAPI.map(rev => ({
            id: rev.review_id,
            employeeId: rev.employee_id,
            employeeName: employees.value.find(e => e.employeeId === rev.employee_id)?.name || 'Unknown',
            department: employees.value.find(e => e.employeeId === rev.employee_id)?.department || 'Unknown',
            period: rev.review_period,
            review: rev.review,
            reviewDate: rev.review_date
        }));
        
        console.log(`Successfully loaded ${reviews.value.length} reviews`);
        isLoading.value = false;
    } catch (error) {
        console.error('Error loading reviews:', error);
        isLoading.value = false;
        alert('Failed to load reviews:\n' + error.message + '\n\nMake sure:\n1. Backend is running on http://localhost:5051\n2. MySQL database is running\n3. "modern_solutions" database exists with "reviews" table');
    }
};

onMounted(async () => {
    try {
        console.log('ReviewView mounted - loading data...');
        employees.value = employeeData.employeeInformation;
        console.log(`Loaded ${employees.value.length} employees`);
        
        await loadReviewData();
    } catch (error) {
        console.error('Error during initialization:', error);
        alert('Failed to load review view: ' + error.message);
    }
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
