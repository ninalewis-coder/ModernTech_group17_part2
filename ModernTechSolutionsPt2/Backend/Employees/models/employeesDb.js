// talks to MySQL

import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'modern_solutions'
});

const getAllEmployeesDb = async () => {
    const [rows] = await db.query('SELECT * FROM employee');
    return rows;
};

const getEmployeeDb = async (employee_id) => {
    const [rows] = await db.query('SELECT * FROM employee WHERE employee_id = ?', [employee_id]);
    return rows[0];
};

const postEmployeeDb = async (employee_id, name, position, department, salary, employment_history, contact) => {
    const [result] = await db.query(
        'INSERT INTO employee (employee_id, name, position, department, salary, employment_history, contact) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [employee_id, name, position, department, salary, employment_history, contact]
    );
    return result;
};

const patchEmployeeDb = async (employee_id, name, position, department, salary, employment_history, contact) => {
    const [update] = await db.query(
        'UPDATE employee SET name = ?, position = ?, department = ?, salary = ?, employment_history = ?, contact = ? WHERE employee_id = ?', 
        [name, position, department, salary, employment_history, contact, employee_id]
    );
    return update;
};

const deleteEmployeeDb = async (employee_id) => {
    const [result] = await db.query('DELETE FROM employee WHERE employee_id = ?', [employee_id]);
    return result;
}

export {getAllEmployeesDb, getEmployeeDb, postEmployeeDb, patchEmployeeDb, deleteEmployeeDb};