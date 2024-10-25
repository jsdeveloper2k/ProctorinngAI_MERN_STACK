import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function MultipleChoiceQuestion({ questions, saveUserTestScore }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinishTest, setIsFinishTest] = useState(false);

  useEffect(() => {
    if (isFinishTest) {
      saveUserTestScore(score); // Save score at the end of the test
    }
  }, [isFinishTest, score, saveUserTestScore]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedOption) {
      const isCorrect = questions[currentQuestion].options.some(
        (option) => option.isCorrect && option._id === selectedOption
      );

      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }

      setSelectedOption(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setIsFinishTest(true);
      }
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb={3}>
          Question {currentQuestion + 1}:
        </Typography>
        <Typography variant="body1" mb={3}>
          {questions[currentQuestion]?.questionText}
        </Typography>
        <Box mb={3}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              {questions[currentQuestion]?.options.map((option) => (
                <FormControlLabel
                  key={option._id}
                  value={option._id}
                  control={<Radio />}
                  label={option.optionText}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
            style={{ marginLeft: 'auto' }}
          >
            {isFinishTest ? 'Finish' : 'Next Question'}
          </Button>
        </Stack>
        {isFinishTest && (
          <Typography variant="h6" mt={3}>
            Your score: {score} / {questions.length}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
