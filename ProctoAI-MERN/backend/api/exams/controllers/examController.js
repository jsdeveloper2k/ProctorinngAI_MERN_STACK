


import asyncHandler from "express-async-handler";
import Exam from "../models/examModel.js";
import Question from "../models/quesModel.js";

import { v4 as uuidv4 } from 'uuid';

// @desc Get all exams
// @route GET /api/exams
// @access Public
const getExams = asyncHandler(async (req, res) => {
  const exams = await Exam.find();
  res.status(200).json(exams);
});

// @desc Create a new exam
// @route POST /api/exams
// @access Private (admin only)
const createExam = asyncHandler(async (req, res) => {
  const { examName, totalQuestions, duration, liveDate, deadDate } = req.body;

  const examId = uuidv4(); // Generate a unique examId

  const exam = new Exam({
    examId,
    examName,
    totalQuestions,
    duration,
    liveDate,
    deadDate,
  });

  const createdExam = await exam.save();

  if (createdExam) {
    res.status(201).json(createdExam);
  } else {
    res.status(400);
    throw new Error("Invalid Exam Data");
  }
});

// @desc Get a specific exam by ID
// @route GET /api/exams/:id
// @access Public
const getExamById = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (exam) {
    res.json(exam);
  } else {
    res.status(404);
    throw new Error("Exam not found");
  }
});

// @desc Get questions for a specific exam by examId
// @route GET /api/exams/questions/:id
// @access Public
const getQuestionsByExamId = asyncHandler(async (req, res) => {
  try {
    const { page, size } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(size, 10) || 10;

    if (isNaN(pageNumber) || isNaN(pageSize)) {
      res.status(400).json({ message: "Invalid page or size parameter" });
      return;
    }

    const questions = await Question.find({ examId: req.params.id })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    if (questions.length > 0) {
      res.json(questions);
    } else {
      res.status(404).json({ message: "No questions found for this exam" });
    }
  } catch (error) {
    console.error(error);
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid examId" });
    } else {
      res.status(500).json({ message: "Error fetching questions" });
    }
  }
});

// @desc Create a new question for an exam
// @route POST /api/exams/questions/:id
// @access Private (admin only)
const createQuestion = asyncHandler(async (req, res) => {
  const { questionText, options, correctAnswer } = req.body;
  const examId = req.params.id;

  // Validate the request data
  console.log(req.body);
// if (!questionText || !options || !examId || !correctAnswer) {
//   res.status(400);
//   throw new Error("Please provide all required fields");
// }
  // Validate the options array
  if (options.length === 0) {
    res.status(400);
    throw new Error("Please provide at least one option");
  }

  for (const option of options) {
    if (!option.optionText) {
      res.status(400);
      throw new Error("Each option must have a non-empty optionText property");
    }
  }

  // Check if the examId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(examId)) {
    res.status(400);
    throw new Error("Invalid examId");
  }

  // Find the exam by ID
  const exam = await Exam.findById(examId);

  if (!exam) {
    res.status(404);
    throw new Error("Exam not found");
  }

  // Create a new question
  const newQuestion = new Question({
    examId: exam._id, // Use the exam's _id field as the examId
    question: questionText, // Updated to use questionText directly
    options: options.map((option) => ({
      text: option.optionText,
      isCorrect: option.optionText === correctAnswer,
    })),
  });

  // Save the question to the database
  const createdQuestion = await newQuestion.save();

  // Return the created question
  res.status(201).json(createdQuestion);
});

export { getExams, createExam, getExamById, getQuestionsByExamId, createQuestion };