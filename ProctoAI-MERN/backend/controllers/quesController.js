import asyncHandler from "express-async-handler";
import Question from "../models/quesModel.js";
import mongoose from "mongoose";

// @desc Create a new question for an exam
// @route POST /api/questions
// @access Private (admin only)
export const createQuestionForExam = asyncHandler(async (req, res) => {
  const { questionText, options, examId } = req.body;

  // Validate the input data
  if (!examId || !mongoose.Types.ObjectId.isValid(examId)) {
    return res.status(400).json({ error: "examId is missing or invalid" });
  }

  if (!questionText || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: "Invalid question data. Ensure the question and at least 2 options are provided." });
  }

  // Construct options to match the schema
  const formattedOptions = options.map(option => ({
    optionText: option.optionText,
    isCorrect: option.isCorrect || false,
  }));

  const newQuestion = new Question({
    questionText,
    options: formattedOptions,
    examId,
  });

  try {
    const createdQuestion = await newQuestion.save();
    res.status(201).json(createdQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create question" });
  }
});

// @desc Get all questions for a specific exam
// @route GET /api/questions/:examId
// @access Private
export const getQuestionsByExamId = asyncHandler(async (req, res) => {
  const { examId } = req.params;

  // Validate examId
  if (!examId || !mongoose.Types.ObjectId.isValid(examId)) {
    return res.status(400).json({ error: "Invalid or missing examId" });
  }

  try {
    const questions = await Question.find({ examId });
    if (questions.length === 0) {
      return res.status(404).json({ error: "No questions found for this exam" });
    }
    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});
