import express from "express";
import {
  getLeaveRequests,
  getLeaveByEmployee,
  createLeaveRequest,
  updateLeaveStatus
} from "../controllers/leaveController.js";

const router = express.Router();

router.get("/", getLeaveRequests);
router.get("/:employee_id", getLeaveByEmployee);
router.post("/", createLeaveRequest);
router.put("/:leave_id", updateLeaveStatus);

export default router;

