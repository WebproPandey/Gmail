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

export const saveDraft = createAsyncThunk('emails/saveDraft', async (emailData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/draft', emailData);
    return response.data.draft;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
})
export const fetchDrafts = createAsyncThunk('emails/fetchDrafts', async () => {
  try {
    const response = await axiosInstance.get('/drafts'); 
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const toggleStarredEmail = createAsyncThunk('emails/toggleStarredEmail', async (id, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.patch(`/star/toggle/${id}`);
    return response.data.email; 
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
    drafts: [],
    starred: [],
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
        state.archive = action.payload.filter((email) => email.archive);
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
      .addCase(saveDraft.fulfilled, (state, action) => {
        state.drafts.push(action.payload); 
      })
      .addCase(fetchDrafts.fulfilled, (state, action) => {
        state.drafts = action.payload; 
      })
    
      .addCase(toggleStarredEmail.fulfilled, (state, action) => {
        const updatedEmail = action.payload;
        const emailIndex = state.emails.findIndex((email) => email._id === updatedEmail._id);
        if (emailIndex !== -1) {
          state.emails[emailIndex] = updatedEmail;
        }
        const archiveIndex = state.archive.findIndex((email) => email._id === updatedEmail._id);
        if (archiveIndex !== -1) {
          state.archive[archiveIndex] = updatedEmail;
        }
        const starredIndex = state.starred.findIndex((email) => email._id === updatedEmail._id);
        if (updatedEmail.starred) {
          if (starredIndex === -1) {
            state.starred.push(updatedEmail);
          }
        } else {
          if (starredIndex !== -1) {
            state.starred.splice(starredIndex, 1);
          }
        }
      })
      
      .addCase(deleteEmail.fulfilled, (state, action) => {
        state.emails = state.emails.filter((email) => email._id !== action.payload);
        state.bin = state.bin.filter((email) => email._id !== action.payload);
        state.archive = state.archive.filter((email) => email._id !== action.payload);
      });
  },
});

export default emailSlice.reducer;