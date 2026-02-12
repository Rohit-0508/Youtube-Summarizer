import api from '../services/api';

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (name, email, password) => {
  const res = await api.post('/auth/signup', { name, email, password });
  return res.data;
};

export const verifyOtp = async (email, otp)=> {
  const res = await api.post('/auth/verify-otp', {email, otp});
  return res.data;
}