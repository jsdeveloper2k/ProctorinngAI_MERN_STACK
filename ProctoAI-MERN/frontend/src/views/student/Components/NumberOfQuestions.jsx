import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import BlankCard from 'src/components/shared/BlankCard';
import { Box, Button, Stack, Typography } from '@mui/material';

const NumberOfQuestions = ({ questionLength, submitTest, examDurationInSeconds }) => {
  const totalQuestions = questionLength; 
  const questionNumbers = Array.from({ length: totalQuestions }, (_, index) => index + 1);
  const [currentQuestion, setCurrentQuestion] = useState(0); // State for current question

  // Timer related states
  const [timer, setTimer] = useState(examDurationInSeconds || 400); // Initialize timer with exam duration

  // Countdown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown); // Stop the timer
          submitTest(); // Automatically submit the test
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdown); // Cleanup the timer when the component unmounts
    };
  }, [submitTest]); // Re-run this effect if submitTest changes

  const handleQuestionButtonClick = (questionNumber) => {
    // Set the current question to the selected question number (0-indexed)
    setCurrentQuestion(questionNumber - 1);
  };

  // Create an array of rows, each containing up to 5 question numbers
  const rows = [];
  for (let i = 0; i < questionNumbers.length; i += 5) {
    rows.push(questionNumbers.slice(i, i + 5));
  }

  return (
    <>
      <Box
        position="sticky"
        top="0"
        zIndex={1}
        bgcolor="white"
        paddingY="10px"
        width="100%"
        px={3}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Questions: {currentQuestion + 1}/{totalQuestions}</Typography>
          <Typography variant="h6">
            Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
          </Typography>
          <Button variant="contained" onClick={submitTest} color="error">
            Finish Test
          </Button>
        </Stack>
      </Box>

      <Box p={3} mt={5} maxHeight="270px">
        <Grid container spacing={1}>
          {rows.map((row, rowIndex) => (
            <Grid key={rowIndex} item xs={12}>
              <Stack direction="row" alignItems="center" justifyContent="start">
                {row.map((questionNumber) => (
                  <Avatar
                    key={questionNumber}
                    variant="rounded"
                    style={{
                      width: '40px',
                      height: '40px',
                      fontSize: '20px',
                      cursor: 'pointer',
                      margin: '3px',
                      background: '#ccc',
                    }}
                    onClick={() => handleQuestionButtonClick(questionNumber)}
                  >
                    {questionNumber}
                  </Avatar>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default NumberOfQuestions;
