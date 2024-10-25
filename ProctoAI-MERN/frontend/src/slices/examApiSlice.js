// import { apiSlice } from './apiSlice';

// const EXAMS_URL = '/api/exams';

// export const examApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     // Get all exams
//     getExams: builder.query({
//       query: () => ({
//         url: `${EXAMS_URL}`,
//         method: 'GET',
//       }),
//       keepUnusedDataFor: 60,
//       onQueryStarted: async (arg, { queryFulfilled, queryRejected }) => {
//         try {
//           await queryFulfilled; // Wait for the query to finish
//         } catch (error) {
//           queryRejected(error);
//         }
//       },
//       onQueryRejected: async (error, { dispatch }) => {
//         console.error('Failed to fetch exams:', error);
//         dispatch(setError('Failed to fetch exams'));
//       },
//     }),
//     // Create a new exam
//     createExam: builder.mutation({
//       query: (data) => ({
//         url: `${EXAMS_URL}`,
//         method: 'POST',
//         body: data,
//       }),
//       onQueryStarted: async (arg, { queryFulfilled, queryRejected }) => {
//         try {
//           await queryFulfilled; // Wait for the mutation to finish
//         } catch (error) {
//           queryRejected(error);
//         }
//       },
//       onQueryRejected: async (error, { dispatch }) => {
//         console.error('Failed to create exam:', error);
//         dispatch(setError('Failed to create exam'));
//       },
//     }),
//     // Get questions for a specific exam
//     getQuestions: builder.query({
//       query: (examId) => {
//         if (!examId) {
//           throw new Error('examId is required to fetch questions'); // Handle missing examId
//         }
//         return {
//           url: `${EXAMS_URL}/${examId}/questions`, // Corrected URL for fetching questions
//           method: 'GET',
//         };
//       },
//       onQueryStarted: async (examId, { queryFulfilled, queryRejected }) => {
//         try {
//           await queryFulfilled; // Wait for the query to finish
//         } catch (error) {
//           queryRejected(error);
//         }
//       },
//       onQueryRejected: async (error, { dispatch }) => {
//         console.error('Failed to fetch questions for examId:', error);
//         dispatch(setError('Failed to fetch questions'));
//       },
//     }),
//     // Create a new question for an exam
//     createQuestion: builder.mutation({
//       query: (data) => {
//         if (!data.examId) {
//           throw new Error('examId is required to create a question'); // Handle missing examId
//         }
//         return {
//           url: `${EXAMS_URL}/${data.examId}/questions`, // Corrected URL for creating questions
//           method: 'POST',
//           body: data,
//         };
//       },
//       onQueryStarted: async (arg, { queryFulfilled, queryRejected }) => {
//         try {
//           await queryFulfilled; // Wait for the mutation to finish
//         } catch (error) {
//           queryRejected(error);
//         }
//       },
//       onQueryRejected: async (error, { dispatch }) => {
//         console.error('Failed to create question:', error);
//         dispatch(setError('Failed to create question'));
//       },
//     }),
//   }),
// });

// // Export hooks for usage in functional components
// export const {
//   useGetExamsQuery,
//   useCreateExamMutation,
//   useGetQuestionsQuery,
//   useCreateQuestionMutation,
// } = examApiSlice;

// src/features/examApiSlice.js
import { apiSlice } from './apiSlice';
import { setError } from './errorSlice'; // Import setError from errorSlice

const EXAMS_URL = '/api/exams';

export const examApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all exams
    getExams: builder.query({
      query: () => ({
        url: `${EXAMS_URL}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 60,
      onQueryStarted: async (arg, { dispatch, queryFulfilled, queryRejected }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(setError('Failed to fetch exams'));
        }
      },
      onQueryRejected: async (error, { dispatch }) => {
        console.error('Failed to fetch exams:', error);
        dispatch(setError('Failed to fetch exams'));
      },
    }),
    // Create a new exam
    createExam: builder.mutation({
      query: (data) => ({
        url: `${EXAMS_URL}`,
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled, queryRejected }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(setError('Failed to create exam'));
        }
      },
      onQueryRejected: async (error, { dispatch }) => {
        console.error('Failed to create exam:', error);
        dispatch(setError('Failed to create exam'));
      },
    }),
    // Get questions for a specific exam
    getQuestions: builder.query({
      query: (examId) => {
        if (!examId) {
          throw new Error('examId is required to fetch questions'); // Handle missing examId
        }
        return {
          url: `${EXAMS_URL}/${examId}/questions`, // Corrected URL for fetching questions
          method: 'GET',
        };
      },
      onQueryStarted: async (examId, { dispatch, queryFulfilled, queryRejected }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(setError('Failed to fetch questions'));
        }
      },
      onQueryRejected: async (error, { dispatch }) => {
        console.error('Failed to fetch questions for examId:', error);
        dispatch(setError('Failed to fetch questions'));
      },
    }),
    // Create a new question for an exam
    createQuestion: builder.mutation({
      query: (data) => {
        if (!data.examId) {
          throw new Error('examId is required to create a question'); // Handle missing examId
        }
        return {
          url: `${EXAMS_URL}/${data.examId}/questions`, // Corrected URL for creating questions
          method: 'POST',
          body: data,
        };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled, queryRejected }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(setError('Failed to create question'));
        }
      },
      onQueryRejected: async (error, { dispatch }) => {
        console.error('Failed to create question:', error);
        dispatch(setError('Failed to create question'));
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetExamsQuery,
  useCreateExamMutation,
  useGetQuestionsQuery,
  useCreateQuestionMutation,
} = examApiSlice;