const handleSubmit = async (event) => {
  event.preventDefault();
  const questionData = {
    examId: selectedExamId,
    questionText: questionText,
    options: options,
    correctAnswer: correctAnswer,
  };

  console.log("Selected Exam ID:", selectedExamId); // Log the selected exam ID

  if (!selectedExamId || typeof selectedExamId !== 'string') {
    console.error("Invalid exam ID:", selectedExamId);
    return;
  }

  console.log("Sending to API:", questionData); // Log the request payload

  try {
    const response = await fetch('/api/exams/questions/' + selectedExamId, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response:", data); // Log the response data
  } catch (error) {
    console.error("Error:", error); // Log the error
  }
};