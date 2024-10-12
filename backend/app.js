import "dotenv/config";
import express from "express";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";

// Import files
import connectToDataBase from "./config/db.js";
import userRoutes from "./routes/user.js";
import profileRoutes from "./routes/profile.js";
import linkRoutes from "./routes/link.js";

// Connect to Database
connectToDataBase();

// Create an app
const app = express();

// Add Body Parser
app.use(express.json());

// Logs middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable cors
app.use(cors());

// Routes
app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Welcome to Link Sharing App!",
  });
});

app.use("/api", userRoutes);
app.use("/api", profileRoutes);
app.use("/api", linkRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data || [];
  res
    .status(status)
    .json({ success: false, statusCode: status, message: message, data: data });
});

// Port
const PORT = process.env.PORT || 8001;

// Server
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
