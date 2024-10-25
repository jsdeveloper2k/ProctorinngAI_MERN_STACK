import express from "express";
import {
  createQuestionForExam,
  getQuestionsByExamId,
} from "../controllers/quesController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc Create a new question for an exam
// @route POST /api/questions
// @access Private (admin only)
router.post("/", protect, createQuestionForExam);

// @desc Get all questions for a specific exam
// @route GET /api/questions/:examId
// @access Private
router.get("/:examId", protect, getQuestionsByExamId);

export default router;
