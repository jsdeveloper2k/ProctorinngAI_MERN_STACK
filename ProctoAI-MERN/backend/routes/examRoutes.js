import express from "express";
import {
  getExams,
  createExam,
  getExamById,
  getQuestions,
  createQuestion // Updated to match the controller
} from "../controllers/examController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes to get all exams and create a new exam
router
  .route("/")
  .get(getExams) // GET /api/exams - Retrieve all exams
  .post(protect, admin, createExam); // POST /api/exams - Create a new exam (protected, admin only)

// Routes to get a specific exam by ID
router
  .route("/:examId") // Updated to use examId
  .get(getExamById); // GET /api/exams/:examId - Retrieve an exam by its ID

// Routes to get questions of a specific exam by examId and create a question for that exam
router
  .route("/questions/:examId") // Keeping :examId for clarity
  .get(getQuestions) // GET /api/exams/questions/:examId - Retrieve questions by examId
  .post(protect, admin, createQuestion); // POST /api/exams/questions/:examId - Create a new question for a specific exam (protected, admin only)

export default router;
