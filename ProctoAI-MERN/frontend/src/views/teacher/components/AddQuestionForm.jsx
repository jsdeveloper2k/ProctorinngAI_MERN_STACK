import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
  Select,
  MenuItem,
} from '@mui/material';
import swal from 'sweetalert';
import { useCreateQuestionMutation, useGetExamsQuery } from './../../../slices/examApiSlice';
import { toast } from 'react-toastify';

const AddQuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState([{ optionText: '', isCorrect: false }, { optionText: '', isCorrect: false }]); // Start with two options
  const [selectedExamId, setSelectedExamId] = useState('');
  const [errors, setErrors] = useState({
    examIdError: false,
    questionError: false,
    optionsError: false,
    correctAnswerError: false,
  });

  const [createQuestion, { isLoading, error }] = useCreateQuestionMutation();
  const { data: examsData, error: examsError } = useGetExamsQuery();

  useEffect(() => {
    if (examsData && examsData.length > 0) {
      setSelectedExamId(examsData[0]._id);
    }
  }, [examsData]);

  const handleAddOption = () => {
    setNewOptions([...newOptions, { optionText: '', isCorrect: false }]);
  };

  const handleRemoveOption = (index) => {
    setNewOptions(newOptions.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index].isCorrect = !updatedOptions[index].isCorrect;
    setNewOptions(updatedOptions);
  };

  const handleOptionTextChange = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index].optionText = value;
    setNewOptions(updatedOptions);
  };

  const handleAddQuestion = async () => {
    const { examIdError, questionError, optionsError, correctAnswerError } = validateForm();

    if (!examIdError && !questionError && !optionsError && !correctAnswerError) {
      try {
        await createQuestion({
          examId: selectedExamId,
          question: newQuestion,
          options: newOptions,
        }).unwrap();
        toast.success('Question added successfully');
        // Reset form after successful addition
        setNewQuestion('');
        setNewOptions([{ optionText: '', isCorrect: false }, { optionText: '', isCorrect: false }]);
      } catch (err) {
        toast.error(`Failed to add question: ${err.message}`);
      }
    }
  };

  const validateForm = () => {
    let newErrors = { ...errors };

    if (!selectedExamId) {
      newErrors.examIdError = true;
    } else {
      newErrors.examIdError = false;
    }

    if (!newQuestion) {
      newErrors.questionError = true;
    } else {
      newErrors.questionError = false;
    }

    if (newOptions.length === 0 || newOptions.some((option) => !option.optionText)) {
      newErrors.optionsError = true;
    } else {
      newErrors.optionsError = false;
    }

    if (!newOptions.some((option) => option.isCorrect)) {
      newErrors.correctAnswerError = true;
    } else {
      newErrors.correctAnswerError = false;
    }

    setErrors(newErrors);

    return newErrors;
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <Select
          value={selectedExamId}
          onChange={(e) => setSelectedExamId(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {examsData &&
            examsData.map((exam) => (
              <MenuItem key={exam._id} value={exam._id}>
                {exam.name}
              </MenuItem>
            ))}
        </Select>

        <TextField
          label="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          error={errors.questionError}
          helperText={errors.questionError ? 'Please enter a question' : ''}
        />

        {newOptions.map((option, index) => (
          <Stack key={index} direction="row" spacing={2}>
            <TextField
              label="Option"
              value={option.optionText}
              onChange={(e) => handleOptionTextChange(index, e.target.value)}
              error={errors.optionsError}
              helperText={errors.optionsError ? 'Please enter an option' : ''}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={option.isCorrect}
                  onChange={() => handleOptionChange(index)}
                />
              }
              label="Correct Answer"
            />
            <Button onClick={() => handleRemoveOption(index)}>Remove</Button>
          </Stack>
        ))}

        <Button onClick={handleAddOption}>Add Option</Button>

        <Button variant="contained" onClick={handleAddQuestion}>
          Add Question
        </Button>
      </Stack>
    </Box>
  );
};

export default AddQuestionForm;