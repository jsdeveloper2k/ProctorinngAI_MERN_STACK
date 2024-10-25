import Question from "../models/quesModel.js";
import Exam from "../models/examModel.js"; // Assuming you have an Exam model
import mongoose from 'mongoose';

// Fetch all exams
export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find(); // Fetch all exams
    res.status(200).json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Fetch questions for a specific exam
export const getQuestions = async (req, res) => {
  const { examId } = req.params;

  try {
    if (!examId) {
      return res.status(400).json({ message: "Exam ID is required." });
    }

    // Fetch questions using examId directly, assuming it's a string
    const questions = await Question.find({ examId: examId });

    if (!questions.length) {
      return res.status(404).json({ message: "No questions found for this exam." });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Create a new exam
export const createExam = async (req, res) => {
  const examData = req.body;

  try {
    const newExam = new Exam(examData);
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    console.error("Error creating exam:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Create a new question for an exam
export const createQuestion = async (req, res) => {
  const questionData = req.body;

  // Validate the required fields
  if (!questionData.questionText) {
    return res.status(400).json({ message: "Question text is required." });
  }

  try {
    const newQuestion = new Question(questionData);
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get exam by ID
export const getExamById = async (req, res) => {
  const { examId } = req.params;

  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found." });
    }
    res.status(200).json(exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
