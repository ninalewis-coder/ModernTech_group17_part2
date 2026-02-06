// handles logic and responses

import { getAllEmployeesDb, getEmployeeDb, postEmployeeDb, patchEmployeeDb, deleteEmployeeDb } from "../models/employeesDb.js";

const getAllEmployeesCon = async (req, res) => {
    try {
        const employees = await getAllEmployeesDb();      
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
        // res.status(500).json({ message: 'Error fetching employees' });
    }
};

const getEmployeeCon = async (req, res) => {
    try {
        const employee = await getEmployeeDb(req.params.employee_id);
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const postEmployeeCon = async (req, res) => {
    try {
        const { employee_id, name, position, department, salary, employment_history, contact } = req.body;
        await postEmployeeDb(employee_id, name, position, department, salary, employment_history, contact);
        res.json({ message: "Employee added" });    
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const patchEmployeeCon = async (req, res) => {
    try {
        const { name, position, department, salary, employment_history, contact } = req.body;
        await patchEmployeeDb(req.params.employee_id, name, position, department, salary, employment_history, contact);  
        res.json({ message: "Employee updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEmployeeCon = async (req, res) => {
    try {
        const employee_id = req.params.employee_id;
        await deleteEmployeeDb(employee_id);
        res.json({ message: "Employee deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllEmployeesCon, getEmployeeCon, postEmployeeCon, patchEmployeeCon, deleteEmployeeCon };