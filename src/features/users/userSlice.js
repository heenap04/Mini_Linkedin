import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../../config';

// API URL
const API_URL = API_ENDPOINTS.USERS;

// Async thunks
// Get user by ID
export const getOtherUser = createAsyncThunk(
  'users/getOtherUser',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_ENDPOINTS.USERS}/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user'
      );
    }
  }
);

// Update user profile
export const updateProfile = createAsyncThunk(
  'users/updateProfile',
  async ({ userId, name, email, bio }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_ENDPOINTS.USERS}/${userId}`,
        { name, email, bio },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);

// Initial state
const initialState = {
  currentUser: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get other user
      .addCase(getOtherUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOtherUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentUser = action.payload;
      })
      .addCase(getOtherUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentUser = null;
      })
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentUser = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearCurrentUser } = userSlice.actions;
export default userSlice.reducer;
