import axios from 'axios';
import axiosInstance from './axiosInstance';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const authApi = {
  // Login: POST /login (NOT /api/login)
  // Body field is "username" (NOT "email") - this is the email value
  // Tokens come in response headers, not body
  login: async (email, password) => {
    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { username: email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );
    const accessToken = response.headers['authorization'];
    const refreshToken = response.headers['authorization-refresh'];
    return { accessToken, refreshToken };
  },

  // Signup: POST /api/signUp
  signUp: (data) => axios.post(`${API_BASE_URL}/api/signUp`, data),

  // Get my info (requires auth)
  getMyInfo: () => axiosInstance.get('/api/member'),
};
