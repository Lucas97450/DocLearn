import axios from 'axios';

const API_URL = 'http://localhost:8000'; // URL de ton backend

export const signup = async (email, password) => {
  return axios.post(`${API_URL}/signup`, { email, password });
};

export const login = async (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};
