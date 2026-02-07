import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import attendanceRoutes from './routes/attendance.js';
import leaveRoutes from './routes/leave.js';
import employeeRoutes from './routes/employee.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'BIGINT', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

const pool = mysql.createPool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 3306
});

// Test DB Connection
pool.getConnection()
    .then(conn => {
        console.log("✅ Database connected successfully to port " + (process.env.DB_PORT || 3306));
        conn.release();
    })
    .catch(err => {
        console.error("❌ Database connection failed:", err.message);
    });

// Payroll queries
const getPayrollData = async () => {
    let [users] = await pool.query('SELECT * FROM payroll;');
    return users;
};

const patchPayrollData = async (payroll_id, employee_id, hours_worked, leave_deductions, final_salary) => {
    let [result] = await pool.query(
        'UPDATE `payroll` SET `payroll_id` = ?, `employee_id` = ?, `hours_worked` = ?, `leave_deductions` = ?, `final_salary` = ? WHERE (`payroll_id` = ?);',
        [payroll_id, employee_id, hours_worked, leave_deductions, final_salary, payroll_id]
    );
    return result;
};

const postPayrollData = async (employee_id, hours_worked, leave_deductions, final_salary) => {
    let [result] = await pool.query(
        'INSERT INTO `payroll` (`payroll_id`, `employee_id`, `hours_worked`, `leave_deductions`, `final_salary`) VALUES (?, ?, ?, ?, ?);',
        [null, employee_id, hours_worked, leave_deductions, final_salary]
    );
    return result;
};

const deletePayrollData = async (payroll_id) => {
    let [result] = await pool.query('DELETE FROM `payroll` WHERE (`payroll_id` = ?);', [payroll_id]);
    return result;
};

// Review queries
const getReviewData = async () => {
    let [users] = await pool.query('SELECT * FROM reviews;');
    return users;
};

const postReviewData = async (employee_id, review_period, review, review_date) => {
    let [result] = await pool.query(
        'INSERT INTO `reviews` (`review_id`, `employee_id`, `review_period`, `review`, `review_date`) VALUES (?, ?, ?, ?, ?);',
        [null, employee_id, review_period, review, review_date]
    );
    return result;
};

const patchReviewData = async (review_id, employee_id, review, rating, review_date) => {
    let [result] = await pool.query(
        'UPDATE `reviews` SET `review_id` = ?, `employee_id` = ?, `review_period` = ?, `review` = ?, `review_date` = ? WHERE (`review_id` = ?);',
        [review_id, employee_id, review, rating, review_date, review_id]
    );
    return result;
};

const deleteReviewData = async (review_id) => {
    let [result] = await pool.query('DELETE FROM `reviews` WHERE (`review_id` = ?);', [review_id]);
    return result;
};

// Payroll routes
app.get('/payroll', async (req, res) => {
    try {
        console.log('GET /payroll - Fetching payroll data...');
        const payrollData = await getPayrollData();
        console.log(`Successfully fetched ${payrollData.length} payroll records`);
        res.json(payrollData);
    } catch (error) {
        console.error('Error fetching payroll:', error.message);
        res.status(500).json({ error: 'Failed to fetch payroll data', details: error.message });
    }
});

app.patch('/payroll/:id', async (req, res) => {
    const { id } = req.params;
    const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;
    try {
        const result = await patchPayrollData(id, employee_id, hours_worked, leave_deductions, final_salary);
        res.json({ message: 'Payroll data updated successfully', result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update payroll data' });
    }
});

app.post('/payroll', async (req, res) => {
    const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;
    try {
        const result = await postPayrollData(employee_id, hours_worked, leave_deductions, final_salary);
        res.json({ message: 'Payroll data added successfully', result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add payroll data' });
    }
});

app.delete('/payroll/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deletePayrollData(id);
        res.json({ message: 'Payroll data deleted successfully', result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete payroll data' });
    }
});

// Attendance routes
app.use('/attendance', attendanceRoutes);

// Leave routes
app.use('/leave', leaveRoutes);

// Employee routes
app.use('/employee', employeeRoutes);

// Review routes
app.get('/reviews', async (req, res) => {
    try {
        console.log('GET /reviews - Fetching review data...');
        const reviewData = await getReviewData();
        console.log(`Successfully fetched ${reviewData.length} review records`);
        res.json(reviewData);
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({ error: 'Failed to fetch review data', details: error.message });
    }
});

app.post('/reviews', async (req, res) => {
    try {
        const { employee_id, review_period, review, review_date } = req.body;
        console.log('POST /reviews - Adding new review:', { employee_id, review_period });

        const date = new Date(review_date);
        const mysqlDate = date.toISOString().slice(0, 19).replace('T', ' ');

        const result = await postReviewData(employee_id, review_period, review, mysqlDate);
        console.log('Successfully added review with ID:', result.insertId);
        res.status(201).json({ message: 'Review added successfully', reviewId: result.insertId });
    } catch (error) {
        console.error('Error adding review:', error.message);
        res.status(500).json({ error: 'Failed to add review', details: error.message });
    }
});

app.patch('/reviews/:id', async (req, res) => {
    const { id } = req.params;
    const { employee_id, review, rating, review_date } = req.body;
    try {
        const result = await patchReviewData(id, employee_id, review, rating, review_date);
        console.log('Successfully updated review with ID:', id);
        res.json({ message: 'Review updated successfully', result });
    } catch (error) {
        console.error('Error updating review:', error.message);
        res.status(500).json({ error: 'Failed to update review', details: error.message });
    }
});

app.delete('/reviews/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await deleteReviewData(id);
        console.log('Successfully deleted review with ID:', id);
        res.json({ message: 'Review deleted successfully', result });
    } catch (error) {
        console.error('Error deleting review:', error.message);
        res.status(500).json({ error: 'Failed to delete review', details: error.message });
    }
});

app.listen(5050, () => {
    console.log('\n' + '='.repeat(50));
    console.log('Payroll + Review API Server is RUNNING');
    console.log('URL: http://localhost:5050');
    console.log('='.repeat(50) + '\n');
});
