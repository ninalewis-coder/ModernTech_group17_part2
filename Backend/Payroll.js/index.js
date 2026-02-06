import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

const pool = mysql.createPool({
    user:'root',
    host:'localhost',
    database:'modern_solutions',
    password:'Strongmaan123!'
});

const getPayrollData = async ()=>{
    let [users] = await pool.query('SELECT * FROM payroll;');
    return users;

};

const patchPayrollData = async (payroll_id,employee_id,hours_worked,leave_deductions,final_salary)=>{
    let [result] = await pool.query('UPDATE `payroll` SET `payroll_id` = ?, `employee_id` = ?, `hours_worked` = ?, `leave_deductions` = ?, `final_salary` = ? WHERE (`payroll_id` = ?);',[payroll_id,employee_id,hours_worked,leave_deductions,final_salary,payroll_id]);
    return result; 
};

const postPayrollData = async (employee_id,hours_worked,leave_deductions,final_salary)=>{
    let [result] = await pool.query('INSERT INTO `payroll` (`payroll_id`, `employee_id`, `hours_worked`, `leave_deductions`, `final_salary`) VALUES (?, ?, ?, ?, ?);',[null,employee_id,hours_worked,leave_deductions,final_salary]);
    return result;  
};

const deletePayrollData = async (payroll_id)=>{
    let [result] = await pool.query('DELETE FROM `payroll` WHERE (`payroll_id` = ?);',[payroll_id]);
    return result; 

}

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
        const result = await patchPayrollData(id,employee_id,hours_worked,leave_deductions,final_salary);
        res.json({ message: 'Payroll data updated successfully', result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update payroll data' });
    }
});

app.post('/payroll', async (req, res) => {
    const { employee_id, hours_worked, leave_deductions, final_salary } = req.body;
    try {
        const result = await postPayrollData(employee_id,hours_worked,leave_deductions,final_salary);
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

app.listen(5050, () => {
    console.log('\n' + '='.repeat(50));
    console.log(' Payroll API Server is RUNNING');
    console.log(' URL: http://localhost:5050');
    console.log('='.repeat(50) + '\n');
});