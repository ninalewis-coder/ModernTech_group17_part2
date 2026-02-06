import db from "../config/db.js";

//POST a leave request
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
    res.status(500).json({ error: "Failed to submit leave request" });
  }
};

// Get all Leave records
export const getLeaveRequests = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM leave_request");
  res.json(rows);
};

//get leave requests by employee
export const getLeaveByEmployee = async (req, res) => {
  const { employee_id } = req.params;
  const [rows] = await db.query(
    "SELECT * FROM leave_request WHERE employee_id = ?",
    [employee_id]
  );
  res.json(rows);
};

//
export const updateLeaveStatus = async (req, res) => {
  const { leave_id } = req.params;
  const { status } = req.body;

  await db.query(
    "UPDATE leave_request SET status = ? WHERE leave_id = ?",
    [status, leave_id]
  );
  res.json({ message: "Leave status updated" });
};

// DELETE leave request record
export const deleteLeaveRequest = async (req, res) => {
  const { leave_id } = req.params;
  await db.query("DELETE FROM leave_request WHERE leave_id = ?", [
    leave_id,
  ]);
  res.json({ message: "Leave request deleted" });

};
