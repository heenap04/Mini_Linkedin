import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../../config';

// API URL
const API_URL = API_ENDPOINTS.POSTS;

// Async thunks
// Create post
export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ content }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user.token}`,
        },
      };

      const { data } = await axios.post(
        API_ENDPOINTS.POSTS,
        { content },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create post'
      );
    }
  }
);

// Get all posts
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.POSTS);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch posts'
      );
    }
  }
);

// Get user posts
export const getUserPosts = createAsyncThunk(
  'posts/getUserPosts',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_ENDPOINTS.POSTS}/user/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user posts'
      );
    }
  }
);

// Delete post
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };

      await axios.delete(`${API_ENDPOINTS.POSTS}/${postId}`, config);

      return postId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete post'
      );
    }
  }
);

// Like post
export const likePost = createAsyncThunk(
  'posts/likePost',
  async (postId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_ENDPOINTS.POSTS}/like/${postId}`,
        {},
        config
      );

      return { postId, likes: data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to like post'
      );
    }
  }
);

// Unlike post
export const unlikePost = createAsyncThunk(
  'posts/unlikePost',
  async (postId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_ENDPOINTS.POSTS}/unlike/${postId}`,
        {},
        config
      );

      return { postId, likes: data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to unlike post'
      );
    }
  }
);

// Initial state
const initialState = {
  posts: [],
  userPosts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create slice
const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Create post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get all posts
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get user posts
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userPosts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload
        );
        state.userPosts = state.userPosts.filter(
          (post) => post._id !== action.payload
        );
      })
      // Like post
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, likes } = action.payload;
        
        state.posts = state.posts.map((post) =>
          post._id === postId ? { ...post, likes } : post
        );
        
        state.userPosts = state.userPosts.map((post) =>
          post._id === postId ? { ...post, likes } : post
        );
      })
      // Unlike post
      .addCase(unlikePost.fulfilled, (state, action) => {
        const { postId, likes } = action.payload;
        
        state.posts = state.posts.map((post) =>
          post._id === postId ? { ...post, likes } : post
        );
        
        state.userPosts = state.userPosts.map((post) =>
          post._id === postId ? { ...post, likes } : post
        );
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
