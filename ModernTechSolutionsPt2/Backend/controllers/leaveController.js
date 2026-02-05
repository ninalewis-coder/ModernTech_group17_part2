import db from "../config/db.js";

// Submit a leave request
export const submitLeave = async (req, res) => {
  const { employee_id, leave_date, reason } = req.body;

  if (!employee_id || !leave_date || !reason) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    await db.query(
      "INSERT INTO leave_request (employee_id, leave_date, reason, status) VALUES (?, ?, ?, 'Pending')",
      [employee_id, leave_date, reason]
    );

    res.status(201).json({ message: "Leave request submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit leave request" });
  }
};

// Get ALL leave requests
export const getLeaveRequests = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM leave_request");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leave requests" });
  }
};

// Get leave requests by employee
export const getLeaveByEmployee = async (req, res) => {
  const { employee_id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM leave_request WHERE employee_id = ?",
      [employee_id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch employee leave requests" });
  }
};

// Add leave request (alias for submitLeave, keeps routes happy)
export const addLeaveRequest = submitLeave;

// Update leave status
export const updateLeaveStatus = async (req, res) => {
  const { leave_id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    await db.query(
      "UPDATE leave_request SET status = ? WHERE leave_id = ?",
      [status, leave_id]
    );

    res.json({ message: "Leave status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};
