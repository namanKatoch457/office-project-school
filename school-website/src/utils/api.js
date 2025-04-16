import axios from 'axios';

// Base URL for our API
const API_BASE_URL = 'http://localhost:5000/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Helper function to handle API responses
const handleResponse = (response) => {
  if (response.status === 200) {
    return {
      status: 'success',
      data: response.data.data || response.data,
      message: response.data.message || ''
    };
  }
  
  return {
    status: 'error',
    data: null,
    message: response.data.message || 'An error occurred'
  };
};

// Helper function to handle API errors
const handleError = (error) => {
  console.error('API Error:', error);
  
  return {
    status: 'error',
    data: null,
    message: error.response?.data?.message || error.message || 'An error occurred'
  };
};

// Student API calls
export const getStudentBirthdays = async () => {
  try {
    const response = await api.get('/students/birthdays/today');
    return response.data;
  } catch (error) {
    console.error('Error fetching student birthdays:', error);
    return { status: 'error', data: [], message: 'Failed to fetch birthdays' };
  }
};

// Get all students 
export const getAllStudents = async () => {
  try {
    const response = await api.get('/students');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    return { status: 'error', data: [], message: 'Failed to fetch students' };
  }
};

// Fetch recent announcements
export const getRecentAnnouncements = async (limit = 6) => {
  try {
    const response = await api.get(`/announcements/recent?limit=${limit}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Instagram API calls
export const getInstagramFeed = async (limit = 6) => {
  try {
    const response = await api.get(`/instagram/feed?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return { status: 'error', data: [], message: 'Failed to fetch Instagram feed' };
  }
};

// Fetch students with birthdays today (using handleResponse pattern)
export const getTodaysBirthdays = async () => {
  try {
    const response = await api.get('/students/birthdays/today');
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Fetch all announcements
export const getAllAnnouncements = async () => {
  try {
    const response = await api.get('/announcements');
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

// Fetch a single announcement by ID
export const getAnnouncementById = async (id) => {
  try {
    const response = await api.get(`/announcements/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export default {
  getStudentBirthdays,
  getAllStudents,
  getRecentAnnouncements,
  getInstagramFeed,
  getTodaysBirthdays,
  getAllAnnouncements,
  getAnnouncementById
}; 