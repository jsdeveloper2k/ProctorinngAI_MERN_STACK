import express from "express";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import examRoutes from "./routes/examRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import quesRoutes from "./routes/quesRoutes.js"; // Import quesRoutes
import path from "path";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/questions", quesRoutes); // Add quesRoutes

// Serve frontend in production mode
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // Handle all other routes by serving the frontend app
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  // Basic route for development mode
  app.get("/", (req, res) => {
    res.send("<h1>Server is running</h1>");
  });
}

// Custom Middlewares
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
