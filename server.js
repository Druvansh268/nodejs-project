const express = require("express");
const cors = require("cors");
const path = require("path");

const analyzeRoute = require("./routes/analyze");
const compareRoute = require("./routes/compare");
const reportRoute = require("./routes/report");

const app = express();
const PORT = process.env.PORT || 5000;

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Serve Frontend */
app.use(express.static(path.join(__dirname, "public")));

/* API Routes */
app.use("/api/analyze", analyzeRoute);
app.use("/api/compare", compareRoute);
app.use("/api/report", reportRoute);

/* Health Check */
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    project: "CipherGuard Password Analyzer",
    status: "Running"
  });
});

/* Frontend Route */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* Start Server */
app.listen(PORT, () => {
  console.log("=====================================");
  console.log(" CipherGuard Server Started");
  console.log("=====================================");
  console.log(` Server: http://localhost:${PORT}`);
  console.log(` API Health: http://localhost:${PORT}/api/health`);
  console.log("=====================================");
});