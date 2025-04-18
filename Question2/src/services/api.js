import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Log requests for debugging
api.interceptors.request.use(request => {
  console.log('Starting API request to:', request.url);
  return request;
});

// Log responses
api.interceptors.response.use(
  response => {
    console.log('API response from:', response.config.url, response.data);
    return response;
  },
  error => {
    console.error('API error:', error.message, error.response?.data);
    return Promise.reject(error);
  }
);

export const getTopUsers = async () => {
  try {

    const response = await api.get('/users');

    return response.data;
  } catch (error) {
    console.error('Error fetching top users:', error);
    return { users: {} };
  }
};

export const getTrendingPosts = async () => {
  try {

    const response = await api.get('/posts?type=popular');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    return [];
  }
};

export const getLatestPosts = async () => {
  try {

    const response = await api.get('/posts?type=latest');
    return response.data;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
};

export const getPostComments = async (postId) => {
  try {

    const response = await api.get(`/posts/${postId}/comments`);
    return response.data.comments || [];
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    return [];
  }
};