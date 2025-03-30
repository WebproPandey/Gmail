import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch emails
export const fetchEmails = createAsyncThunk('emails/fetchEmails', async () => {
  const response = await axios.get('http://localhost:3000/api/mail/inbox');
  return response.data;
});

const emailSlice = createSlice({
  name: 'emails',
  initialState: {
    emails: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.emails = action.payload;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default emailSlice.reducer;