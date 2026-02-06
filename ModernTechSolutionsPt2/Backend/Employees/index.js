// setup + middleware

import express from "express";
import cors from "cors";
import { getAllEmployeesCon, getEmployeeCon, postEmployeeCon, patchEmployeeCon, deleteEmployeeCon } from "./controllers/employeesCon.js";

const app = express();

app.use(cors());
app.use(express.json());

// Add this BEFORE your employee routes
app.post("/test", (req, res) => {
  console.log("Test body received:", req.body);
  console.log("Content-Type header:", req.headers["content-type"]);
  res.json({ 
    message: "Test successful", 
    body: req.body,
    bodyType: typeof req.body 
  });
});

app.get("/employee", getAllEmployeesCon);
app.get("/employee/:employee_id", getEmployeeCon);
app.post("/employee", postEmployeeCon);
app.patch("/employee/:employee_id", patchEmployeeCon);
app.delete("/employee/:employee_id", deleteEmployeeCon);

app.listen(5050, () => {
  console.log("http://localhost:5050");
});