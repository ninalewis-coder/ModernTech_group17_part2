import db from "../config/db.js";

// Get all employees
export const getAllEmployees = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM employee");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching employees" });
    }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM employee WHERE employee_id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching employee" });
    }
};

// Add new employee
export const addEmployee = async (req, res) => {
    const { employee_id, name, position, department, salary, employment_history, contact } = req.body;
    try {
        await db.query(
            "INSERT INTO employee (employee_id, name, position, department, salary, employment_history, contact) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [employee_id, name, position, department, salary, employment_history, contact]
        );
        res.status(201).json({ message: "Employee added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding employee" });
    }
};

// Update employee
export const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, position, department, salary, employment_history, contact } = req.body;
    try {
        await db.query(
            "UPDATE employee SET name = ?, position = ?, department = ?, salary = ?, employment_history = ?, contact = ? WHERE employee_id = ?",
            [name, position, department, salary, employment_history, contact, id]
        );
        res.json({ message: "Employee updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating employee" });
    }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM employee WHERE employee_id = ?", [id]);
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting employee" });
    }
};
