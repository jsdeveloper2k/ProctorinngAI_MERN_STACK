import { apiSlice } from './apiSlice';

// Define the base URL for the users API
const USERS_URL = '/api/users';

// Inject endpoints for the cheating log slice
export const cheatingLogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get cheating logs for a specific exam
    getCheatingLogs: builder.query({
      query: (examId) => ({
        url: `${USERS_URL}/cheatingLogs/${examId}`, // Route for fetching cheating logs
        method: 'GET',
      }),
      // Error handling for fetching logs
      onError: (error) => {
        console.error('Failed to fetch cheating logs:', error);
      },
    }),
    // Save a new cheating log entry for an exam
    saveCheatingLog: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/cheatingLogs`, // Route for saving cheating logs
        method: 'POST',
        body: data,
      }),
      // Error handling for saving logs
      onError: (error) => {
        console.error('Failed to save cheating log:', error);
      },
    }),
  }),
});

// Export the generated hooks for each endpoint
export const { useGetCheatingLogsQuery, useSaveCheatingLogMutation } = cheatingLogApiSlice;
