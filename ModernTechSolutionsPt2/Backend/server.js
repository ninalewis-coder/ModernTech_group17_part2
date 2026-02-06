import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import leaveRoutes from "./routes/leave.js";
import attendanceRoutes from "./routes/attendance.js";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5050;

app.use(cors());
app.use(express.json());

app.use("/api/leave", leaveRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => {
  res.send("ModernTech API running");
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
