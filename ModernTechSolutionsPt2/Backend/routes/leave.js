import express from "express";
import {getLeaveRequests,getLeaveByEmployee,submitLeave,updateLeaveStatus,deleteLeaveRequest} from "../controllers/leaveController.js";

const router = express.Router();

router.get("/", getLeaveRequests);
router.get("/:employee_id", getLeaveByEmployee);
router.post("/", submitLeave);
router.put("/:leave_id", updateLeaveStatus);
router.patch("/:leave_id", updateLeaveStatus);
router.delete("/:leave_id", deleteLeaveRequest);


export default router;

