
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

// Update attendance status
export const updateAttendance = async (req, res) => {
  const { attendance_id } = req.params;
  const { status } = req.body;

  console.log(`[Attendance] Updating ID: ${attendance_id} to status: ${status}`);

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    const [result] = await db.query(
      "UPDATE attendance SET status = ? WHERE attendance_id = ?",
      [status, attendance_id]
    );

    if (result.affectedRows === 0) {
      console.log("[Attendance] No rows updated. ID may not exist.");
      return res.status(404).json({ message: "Attendance record not found" });
    }

    console.log("[Attendance] Update successful.");
    res.json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.error("[Attendance] Error updating:", error);
    res.status(500).json({ message: "Error updating attendance" });
  }
};
// Patch attendance status
export const patchAttendance = async (req, res) => {
  const { attendance_id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    await db.query("UPDATE attendance SET status = ? WHERE attendance_id = ?", [status, attendance_id]);

    res.json({ message: "Attendance status patched successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error patching attendance status" });
  }
};

// Delete attendance record
export const deleteAttendance = async (req, res) => {
  const { attendance_id } = req.params;

  try {
    await db.query("DELETE FROM attendance WHERE attendance_id = ?", [attendance_id]);

    res.json({ message: "Attendance deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting attendance" });
  }

};
