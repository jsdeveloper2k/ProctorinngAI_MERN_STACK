// import express from 'express';
// import { getExams, createExam } from '../controllers/examController';

// const router = express.Router();

// router.get('/', getExams);
// router.post('/', createExam);

// export default router;

import express from "express";
import {
  getExams,
  createExam,
  getExamById,
  getQuestionsByExamId,
  createQuestion,
} from "../controllers/examController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Routes to get all exams and create a new exam
router
  .route("/")
  .get(getExams) // GET /api/exams
  .post(protect, admin, createExam); // POST /api/exams (protected, admin only)

// Routes to get a specific exam by ID
router
  .route("/:id")
  .get(getExamById); // GET /api/exams/:id

// Routes to get questions of a specific exam by examId and create a question
router
  .route("/questions/:id")
  .get(getQuestionsByExamId) // GET /api/exams/questions/:id (id refers to examId)
  .post(protect, admin, createQuestion); // POST /api/exams/questions/:id (protected, admin only)

export default router;
