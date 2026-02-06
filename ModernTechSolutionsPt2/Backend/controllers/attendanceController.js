import db from "../config/db.js";

// Get ALL attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.attendance_id,
        a.date,
        a.status,
        e.employee_id,
        e.name
      FROM attendance a
      JOIN employee e ON a.employee_id = e.employee_id
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching attendance" });
  }
};

// Get attendance by employee
export const getAttendanceByEmployee = async (req, res) => {
  const { employee_id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM attendance WHERE employee_id = ?",
      [employee_id]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching employee attendance" });
  }
};

// Add attendance
export const addAttendance = async (req, res) => {
  const { employee_id, date, status } = req.body;

  try {
    await db.query(
      "INSERT INTO attendance (employee_id, date, status) VALUES (?, ?, ?)",
      [employee_id, date, status]
    );

    res.status(201).json({ message: "Attendance added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding attendance" });
  }
};
