import express from "express";
import {getAllAttendance,getAttendanceByEmployee,addAttendance,updateAttendance,patchAttendance, deleteAttendance} from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", getAllAttendance);
router.get("/employee/:employee_id", getAttendanceByEmployee);
router.post("/", addAttendance);
router.put("/:attendance_id", updateAttendance);
router.patch("/:attendance_id", patchAttendance);
router.delete("/:attendance_id", deleteAttendance);
export default router;



