
import mongoose from "mongoose";

const optionSchema = mongoose.Schema({
  optionText: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
}, { _id: true }); // Keep _id field automatically generated

const questionSchema = mongoose.Schema({
  examId: {
    type: String, // Change this from mongoose.Schema.Types.ObjectId to String
    required: true,
    // ref: "Exam", // You may want to remove this if examId is no longer an ObjectId
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [optionSchema], // Use the optionSchema for options
    validate: {
      validator: (v) => v.length >= 2, // Ensure at least 2 options are provided
      message: "A question must have at least 2 options.",
    },
    required: true,
  },
}, {
  timestamps: true,
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
