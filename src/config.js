const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  POSTS: `${API_BASE_URL}/api/posts`,
  USERS: `${API_BASE_URL}/api/users`
};
