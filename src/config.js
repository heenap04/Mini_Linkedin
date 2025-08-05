// Use Render backend URL for production, fallback to localhost for development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://mini-linkedin-backend-wuv3.onrender.com';

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  POSTS: `${API_BASE_URL}/api/posts`,
  USERS: `${API_BASE_URL}/api/users`
};
