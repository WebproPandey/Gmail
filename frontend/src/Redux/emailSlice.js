import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

// Fetch emails
export const fetchEmails = createAsyncThunk('emails/fetchEmails', async () => {
  const response = await axiosInstance.get('/inbox');
  return response.data;
});

// Move email to bin
export const moveToBin = createAsyncThunk('emails/moveToBin', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(`/bin/${id}`);
    return response.data.email; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Archive email
export const archiveEmail = createAsyncThunk('emails/archiveEmail', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(`/archive/${id}`);
    return response.data.email; 
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const deleteEmail = createAsyncThunk('emails/deleteEmail', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`/delete/${id}`);
    return id; // Return the ID of the deleted email
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const emailSlice = createSlice({
  name: 'emails',
  initialState: {
    emails: [],
    bin: [],
    archive: [],
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
        state.emails = action.payload.filter((email) => !email.bin && !email.archive); // Filter out bin and archived emails
        state.bin = action.payload.filter((email) => email.bin); // Store bin emails
        state.archive = action.payload.filter((email) => email.archive); // Store archived emails
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(moveToBin.fulfilled, (state, action) => {
        state.emails = state.emails.filter((email) => email._id !== action.payload._id);
        state.bin.push(action.payload);
      })
      .addCase(archiveEmail.fulfilled, (state, action) => {
        state.emails = state.emails.filter((email) => email._id !== action.payload._id);
        state.archive.push(action.payload);
      })
      .addCase(deleteEmail.fulfilled, (state, action) => {
        state.emails = state.emails.filter((email) => email._id !== action.payload);
        state.bin = state.bin.filter((email) => email._id !== action.payload);
        state.archive = state.archive.filter((email) => email._id !== action.payload);
      });
  },
});

export default emailSlice.reducer;