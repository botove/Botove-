import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function verifyGoogleToken(token) {
  try {
    const response = await axios.post(`${API_URL}/auth/google`, { token });
    return response.data;
  } catch (error) {
    console.error('Google token verification failed:', error);
    throw error;
  }
}

export function saveUserToken(token) {
  localStorage.setItem('userToken', token);
}

export function getUserToken() {
  return localStorage.getItem('userToken');
}

export function clearUserToken() {
  localStorage.removeItem('userToken');
}

export function saveUserData(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}

export function getUserData() {
  const data = localStorage.getItem('userData');
  return data ? JSON.parse(data) : null;
}
