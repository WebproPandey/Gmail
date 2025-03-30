import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

// Async thunk to send an email
export const sendEmail = createAsyncThunk('composeMail/sendEmail', async (emailData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/send', emailData);
    return response.data; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const composeMailSlice = createSlice({
  name: 'composeMail',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendEmail.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default composeMailSlice.reducer;