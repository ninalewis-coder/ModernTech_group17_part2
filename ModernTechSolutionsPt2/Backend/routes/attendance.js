import express from "express";
import {getAllAttendance,getAttendanceByEmployee,addAttendance} from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", getAllAttendance);

router.get("/:employee_id", getAttendanceByEmployee);

router.post("/", addAttendance);

export default router;


